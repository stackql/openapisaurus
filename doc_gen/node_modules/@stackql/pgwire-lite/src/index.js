import { createLogger, format, transports } from 'winston';
import { createConnection, createTLSConnection } from './connection.js'; // Import both functions

// Main function to connect to PostgreSQL and send queries
export function runQuery(connectionOptions, query) {
  return new Promise(async (resolve, reject) => {
    const user = connectionOptions.user;
    const database = connectionOptions.database;
    const host = connectionOptions.host;
    const port = connectionOptions.port;
    const debug = connectionOptions.debug || false; 
    const { cert, key, ca } = connectionOptions; // Destructure cert, key, and ca from options

    // set up logger
    const logger = createLogger({
        level: 'info',
        format: format.combine(
          format.colorize(),
          format.simple()
        ),
        transports: [new transports.Console()],
    });

    if (debug) {
      logger.level = 'debug';
    }

    try {
      let result;

      // Check if cert, key, and ca are available, if yes, use TLS connection
      if (cert && key && ca) {
        result = await createTLSConnection(host, port, user, database, logger, query, cert, key, ca);
      } else {
        // Otherwise, fall back to non-TLS connection
        result = await createConnection(host, port, user, database, logger, query);
      }

      resolve(result);
    } catch (err) {
      reject(err);
    }
  });
}