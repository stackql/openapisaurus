import { Buffer } from 'buffer';

// Protocol constants
const SSL_REQUEST_CODE = 80877103;

//
// exported functions
//
export function createStartupMessage(user, database) {
    const userBuffer = Buffer.from(`user\0${user}\0`);
    const databaseBuffer = Buffer.from(`database\0${database}\0`);
    const protocolVersion = Buffer.from([0x00, 0x03, 0x00, 0x00]);
    const nullTerminator = Buffer.from([0x00]);
  
    const payload = Buffer.concat([protocolVersion, userBuffer, databaseBuffer, nullTerminator]);
    const length = Buffer.alloc(4);
    length.writeUInt32BE(payload.length + 4, 0); // Message length
  
    return Buffer.concat([length, payload]);
}

export function createQueryMessage(query) {
    const queryBuffer = Buffer.from(query);
    const messageLength = Buffer.alloc(4);
    messageLength.writeUInt32BE(queryBuffer.length + 5, 0); // 4 for length, 1 for null terminator
    
    return Buffer.concat([Buffer.from('Q'), messageLength, queryBuffer, Buffer.from([0])]);
}
   
export function readResponse(socket, logger, type = 'startup') {
    return new Promise((resolve) => {
        let result = { message: '', data: [] };
        let rowDescription = [];
        let processingComplete = false;
    
        socket.on('data', (data) => {
        let offset = 0;
        while (offset < data.length) {
            const messageType = data.toString('utf-8', offset, offset + 1); // Read 1 byte for message type
            offset += 1;
    
            const messageLength = data.readUInt32BE(offset); // Read 4 bytes for length
            offset += 4;
    
            const content = data.slice(offset, offset + messageLength - 4); // Subtract 4 for the length field
            offset += messageLength - 4;
    
            if (messageType === 'R') {
            const authType = content.readUInt32BE(0);
            if (authType === 0) {
                result.message = 'Authentication successful.';
            } else {
                result.message = 'Authentication required, unsupported by this client.';
                socket.end();
                return resolve(result);
            }
            } else if (messageType === 'S') {
                processParameterStatus(content, logger);
            } else if (messageType === 'T') {
                rowDescription = processRowDescription(content);
            } else if (messageType === 'D') {
                const row = processDataRow(content, rowDescription);
                result.data.push(row);
            } else if (messageType === 'C') {
                result.message = content.toString('utf-8').replace(/\0/g, '');
            } else if (messageType === 'E') {
                result.message = `Error: ${content.toString('utf-8')}`;
            } else if (messageType === 'Z') {
                result.message = 'Ready for query.';
                processingComplete = true;
            } else {
                logger.debug(`unhandled message type: ${messageType}, content: ${content.toString('hex')}`);
            }
        }
    
        // Resolve the promise and stop processing further data once done
        if (processingComplete) {
            socket.removeAllListeners('data'); // Ensure we don't process more data for this type
            resolve(result);
        }
        });
    });
}

export function encodeSSLRequest() {
    const buffer = Buffer.alloc(8);
    buffer.writeInt32BE(8, 0); // Message length
    buffer.writeInt32BE(SSL_REQUEST_CODE, 4); // SSL Request code
    return buffer;
}

//
// helper functions
//

// Function to handle parameter status updates
function processParameterStatus(content, logger) {
    const parts = content.toString('utf-8').split('\0');
    if (parts.length >= 2) {
        logger.debug(`server parameter: ${parts[0]} = ${parts[1]}`);
    }
}
  
// Function to handle row description message
function processRowDescription(content) {
    const fieldCount = content.readUInt16BE(0);
    let offset = 2;
    const fields = [];

    for (let i = 0; i < fieldCount; i++) {
        const fieldNameEnd = content.indexOf(0, offset); // Find null terminator
        const fieldName = content.toString('utf-8', offset, fieldNameEnd);
        fields.push(fieldName);
        offset = fieldNameEnd + 19; // Skip past field metadata
    }

    return fields;
}
  
// Function to process data rows
function processDataRow(content, rowDescription) {
    const fieldCount = content.readUInt16BE(0);
    let offset = 2;
    const row = {};

    for (let i = 0; i < fieldCount; i++) {
        const fieldLength = content.readInt32BE(offset);
        offset += 4;

        if (fieldLength === -1) {
            row[rowDescription[i]] = null; // NULL field
        } else {
            row[rowDescription[i]] = content.toString('utf-8', offset, offset + fieldLength);
            offset += fieldLength;
        }
    }

    return row;
}
