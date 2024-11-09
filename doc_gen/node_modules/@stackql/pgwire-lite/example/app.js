import fs from 'fs';
import { runQuery } from '../src/index.js'; // Importing from index.js

// Get the command-line argument for useTLS (default to `false` if not provided)
const useTLS = process.argv[2] === 'true';

// Prepare the connection options
const connectionOptions = {
  user: 'stackql',
  database: 'stackql',
  host: 'localhost',
  port: 5444,
  debug: true,
  useTLS: useTLS, // Pass the useTLS argument
  // Include cert, key, and ca only when TLS is enabled
  ...(useTLS && {
    cert: fs.readFileSync('/home/javen/ssl-test/client_cert.pem'),
    key: fs.readFileSync('/home/javen/ssl-test/client_key.pem'),
    ca: fs.readFileSync('/home/javen/ssl-test/server_cert.pem'),
  }),
};

// Define the queries you want to run
const queries = [
  "SHOW PROVIDERS",
  "REGISTRY PULL azure",
  "SHOW SERVICES IN azure",
];

// Function to run multiple queries sequentially
(async () => {
  try {
    for (const query of queries) {
      const result = await runQuery(connectionOptions, query); // Wait for each query to finish
      console.log('');
      console.info(result.data);
      console.log('');
    }
  } catch (error) {
    console.error('Error executing queries:', error.message);
  }
})();