#!/bin/sh

# If no args supplied sleep time defaults to 5 seconds.
if [[ ${#} -eq 0 ]]
then
    SLEEP=5
fi

# Script for app start up and waiting database server to be ready.
# Repeat command until port 3306 on address db is not ready.
until nc -z -v -w30 db 3306
do
  echo "Waiting for database connection..."
  # Wait for 5 seconds before check again.
  sleep ${SLEEP}
done

echo "Database server ready..."

# Start the application.
node ./server/server.js