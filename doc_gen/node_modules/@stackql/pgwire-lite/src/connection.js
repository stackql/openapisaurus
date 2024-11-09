import net from 'net';
import tls from 'tls';
import { createStartupMessage, createQueryMessage, readResponse, encodeSSLRequest } from './protocol.js';

export function createConnection(host, port, user, database, logger, query) {
    return new Promise((resolve, reject) => {
        const socket = net.createConnection({ host, port }, async () => {
            logger.debug(`connected to ${host}:${port}`);

            // Send startup message
            const startupMessage = createStartupMessage(user, database);
            socket.write(startupMessage);

            // Read response for startup/authentication
            const startupResponse = await readResponse(socket, logger, 'startup');
            logger.debug(`startup response message: ${startupResponse.message}`);

            if (startupResponse.message === 'Ready for query.') {
                // Send query message after startup
                logger.debug(`sending query: ${query}`);
                const queryMessage = createQueryMessage(query);
                socket.write(queryMessage);

                // Read response for query
                const queryResponse = await readResponse(socket, logger, 'query');
                logger.debug(`query response message: ${queryResponse.message}`);

                // Close the socket after query response
                socket.end();
                resolve(queryResponse);
            } else {
                reject(new Error('Failed to authenticate with the database.'));
                socket.end();
            }
        });

        socket.on('error', (err) => {
            logger.error(`socket connection error: ${err.message}`);
            reject(err);
        });

        socket.on('close', (hadError) => {
            if (hadError) {
                logger.error('connection closed due to an error.');
            } else {
                logger.debug('connection closed.');
            }
        });

    });
}

export function createTLSConnection(host, port, user, database, logger, query, cert, key, ca) {
    return new Promise((resolve, reject) => {
        logger.info(`connecting to ${host}:${port} using TLS`);

        const socket = new net.Socket();

        socket.connect(port, host, () => {
            logger.debug('requesting SSL upgrade');
            const sslRequestMessage = encodeSSLRequest();
            socket.write(sslRequestMessage);
        });

        socket.on('data', (data) => {
            // Check if the server accepts SSL (PostgreSQL returns 'S' for success)
            if (data.toString() === 'S') {
                logger.debug('SSL/TLS upgrade accepted by server, establishing TLS connection');

                const tlsOptions = {
                    socket,
                    cert: cert,
                    key: key,
                    ca: ca,
                    rejectUnauthorized: true,
                    checkServerIdentity: () => undefined // Allow self-signed certificates for testing purposes
                };

                const tlsSocket = tls.connect(tlsOptions, async () => {
                    logger.debug('TLS connection established');

                    // Send startup message
                    const startupMessage = createStartupMessage(user, database);
                    tlsSocket.write(startupMessage); // Use tlsSocket

                    // Read response for startup/authentication
                    const startupResponse = await readResponse(tlsSocket, logger, 'startup'); // Use tlsSocket
                    logger.debug(`startup response message: ${startupResponse.message}`);

                    if (startupResponse.message === 'Ready for query.') {
                        // Send query message after startup
                        logger.debug(`sending query: ${query}`);
                        const queryMessage = createQueryMessage(query);
                        tlsSocket.write(queryMessage); // Use tlsSocket

                        // Read response for query
                        const queryResponse = await readResponse(tlsSocket, logger, 'query'); // Use tlsSocket
                        logger.debug(`query response message: ${queryResponse.message}`);

                        // Close the TLS socket after query response
                        tlsSocket.end();
                        resolve(queryResponse);
                    } else {
                        reject(new Error('Failed to authenticate with the database.'));
                        tlsSocket.end();
                    }
                });

                // Handle errors and closing the TLS connection
                tlsSocket.on('error', (err) => {
                    logger.error(`TLS connection error: ${err.message}`);
                    reject(err);
                });

                tlsSocket.on('close', () => {
                    logger.info('TLS connection closed');
                });

            } else {
                logger.error('server refused SSL connection');
                reject(new Error('server refused SSL connection'));
            }
        });

        socket.on('error', (err) => {
            logger.error(`socket connection error: ${err.message}`);
            reject(err);
        });
    });
}