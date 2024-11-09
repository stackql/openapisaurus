# pgwire-lite

__`pgwire-lite`__ is a minimalistic PostgreSQL wire protocol library for Node.js. It is designed to be a lightweight alternative to other PostgreSQL wire protocol libraries, providing a simple and efficient way to connect to and interact with PostgreSQL wire protocol-compatible servers, such as [__`stackql`__](https://github.com/stackql/stackql).

## Features

- Lightweight and minimal PostgreSQL wire protocol client
- Supports both secure (TLS) and non-secure connections
- Easily customizable and extendable
- Designed to interact with PostgreSQL wire protocol-compatible services like [__`stackql`__](https://github.com/stackql/stackql)

## Installation

To install `pgwire-lite`, run the following command:

```bash
npm i @stackql/pgwire-lite
```

## Quickstart

Below is an example of how to use `pgwire-lite` to connect to a PostgreSQL-compatible server with both TLS and non-TLS options.

### Example: run queries against a server without TLS

```javascript
import { runQuery } from '@stackql/pgwire-lite';
const connectionOptions = {
  user: 'stackql',
  database: 'stackql',
  host: 'localhost',
  port: 5444,
  debug: false,
};
(async () => {
  try {
    const result = await runQuery(connectionOptions, "REGISTRY LIST");
    console.info(result.data);
  } catch (error) {
    console.error('Error executing queries:', error.message);
  }
})();
```
### Example: run queries against a server with TLS

```javascript
import fs from 'fs';
import { runQuery } from '@stackql/pgwire-lite';
const connectionOptions = {
    user: 'stackql',
    database: 'stackql',
    host: 'localhost',
    port: 5444,
    debug: true,
    cert: fs.readFileSync('/path/to/client_cert.pem'),
    key: fs.readFileSync('/path/to/client_key.pem'),
    ca: fs.readFileSync('/path/to/server_cert.pem'),
};
(async () => {
  try {
    const result = await runQuery(connectionOptions, "REGISTRY LIST");
    console.info(result.data);
  } catch (error) {
    console.error('Error executing queries:', error.message);
  }
})();
```

## Testing

You can test `pgwire-lite` using [stackql](https://github.com/stackql/stackql) by following these steps.

### Step 1: Download stackql

```bash
curl -L https://bit.ly/stackql-zip -O && unzip stackql-zip
```

### Step 2: Running Tests

1. **Test without TLS**:
    ```bash
    npm test
    ```

2. **Test with TLS**:
    ```bash
    npm run secure-test # or
    NODE_DEBUG=tls,node::http npm run secure-test
    ```

### Step 3: Running the Example App (optional)

1. **Test without TLS**:
    ```bash
    sh start-server.sh
    node example/app.js
    sh stop-server.sh
    ```

2. **Test with TLS**:
    ```bash
    sh start-secure-server.sh
    node example/app.js true
    sh stop-server.sh
    ```

## Publishing

to publish or update on [npmjs](https://www.npmjs.com/org/stackql):

```bash
npm login
npm publish --access public
```
