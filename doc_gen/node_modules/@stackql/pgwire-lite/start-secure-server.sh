#!/bin/bash

# Ensure any existing server is stopped
./stop-server.sh

# Generate server and client certificates
mkdir -p ~/ssl-test
rm -rf ~/ssl-test/*
openssl req -x509 -keyout ~/ssl-test/server_key.pem -out ~/ssl-test/server_cert.pem -config ./ssl/openssl.cnf -days 365 >/dev/null 2>&1
openssl req -x509 -keyout ~/ssl-test/client_key.pem -out ~/ssl-test/client_cert.pem -config ./ssl/openssl.cnf -days 365 >/dev/null 2>&1
chmod 400 ~/ssl-test/client_key.pem

# Export environment variables for secure server  
export PGPORT=5444
export PGSSLCERT=~/ssl-test/client_cert.pem
export PGSSLKEY=~/ssl-test/client_key.pem
export PGSSLROOTCERT=~/ssl-test/server_cert.pem
export PGSSLSRVKEY=~/ssl-test/server_key.pem
export CLIENT_CERT=$(base64 -w 0 ~/ssl-test/client_cert.pem)
export PGSSLMODE=require

# Start the secure PostgreSQL server using stackql
nohup ./stackql srv --pgsrv.address=0.0.0.0 --pgsrv.port=$PGPORT --pgsrv.tls='{ "keyFilePath": "'${PGSSLSRVKEY}'", "certFilePath": "'${PGSSLROOTCERT}'", "clientCAs": [ "'${CLIENT_CERT}'" ] }' >/dev/null 2>&1 &
echo "secure server started on port $PGPORT with TLS"