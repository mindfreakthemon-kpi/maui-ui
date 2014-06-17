#!/bin/sh
cd /vagrant
npm install -g grunt-cli

if [ -d "node_modules" ]; then
  npm rebuild --no-bin-link
else
  npm install --no-bin-link
fi

start-stop-daemon --start --oknodo --name grunt --pidfile /var/run/grunt.pid --background --chdir . --startas `which grunt` server
