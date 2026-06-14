#!/usr/bin/env bashio
set -e

bashio::log.info "Starting SWA8 Device Manager add-on..."

cd /app
exec node server.js
