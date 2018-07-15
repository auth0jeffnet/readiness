// declare variables for the require objects
var http = require('http');
var bunyan = require('bunyan');

////////////////////////////////////////////////////////////////
// configuration: TODO: should go into a configuration file
////////////////////////////////////////////////////////////////
// the port number for the report
iPortNumber = 54321;
// the log file for the service
sLogFileInfoLog = '/tmp/readiness-info.log'

// declare a bunyan logging instance
var log = bunyan.createLogger({
    name: "readiness",
    level: 0,
    streams: [
      {
        level: 'info',
        path: sLogFileInfoLog
      },
      {
        level: 'error',
        stream: process.stdout
      }
    ]
});

// create the server handler for the report
var oServerReport = http.createServer(function (req, res) {
   res.writeHead(200, {'Content-Type': 'text/plain'});
   res.end('readiness is not yet ready\n');
}).listen(iPortNumber);

// register a callback to handle shutdown properly
process.on('SIGTERM', function () {
  oServerReport.close(function () {
    log.info('readiness server caught SIGTERM, stopping on port %d', iPortNumber);
    process.exit(0);
  });
});

// register a callback to handle configuration reload properly
process.on('SIGHUP', function () {
  log.info('readiness server caught SIGHUP, reloading configuration');
  // TODO: reload the configuration and then update the variables
});

log.info('readiness server running at port %d', iPortNumber);

// TODO: perform the application loop


