#!/bin/bash

# Check if stackql server is running and kill the process
SERVER_PID=$(pgrep -f "stackql")

if [ -n "$SERVER_PID" ]; then
  echo "stopping stackql server with PID $SERVER_PID..."
  kill -9 $SERVER_PID
  echo "stackql server stopped."
else
  echo "no running stackql server found."
fi
