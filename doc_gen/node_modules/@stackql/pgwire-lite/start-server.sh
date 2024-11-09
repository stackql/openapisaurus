check_and_stop_server() {
  # Check if stackql server is running using pgrep
  SERVER_PID=$(pgrep -f "stackql")
  
  if [ -n "$SERVER_PID" ]; then
    echo "stackql server is running with PID $SERVER_PID, stopping it..."
    ./stop-server.sh
  else
    echo "no running stackql server found."
  fi
}

check_and_stop_server

PGPORT=5444
echo "starting local stackql server on port $PGPORT"
nohup ./stackql --pgsrv.address=0.0.0.0 --pgsrv.port=$PGPORT srv &
sleep 5
echo "stackql server started"
