// declare variables for the require objects
var http = require('http');
var bunyan = require('bunyan');

// configuration: TODO: should go into a configuration file
iPortNumber = 54321;
sLogFileErrorLog = '/tmp/readiness-error.log'

var log = bunyan.createLogger({
    name: "readiness",
    level: 0,
    streams: [
      {
        level: 'info',
        path: sLogFileErrorLog
      },
      {
        level: 'error',
        stream: process.stdout
      }
    ]
});

http.createServer(function (req, res) {
   res.writeHead(200, {'Content-Type': 'text/plain'});
   res.end('readiness is not yet ready\n');
}).listen(iPortNumber);

log.info('readiness server running at port %d', iPortNumber);

