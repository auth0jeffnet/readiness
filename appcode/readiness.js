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
iWaitTimeInMilliseconds = 3000;
sReportData = '{"details":"readiness is not yet ready"}';

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

function determineTimeNowInSeconds() {
   var iDtsNowInMilliseconds = (new Date).getTime();
   var iDtsNowInSeconds = Math.floor(iDtsNowInMilliseconds / 1000);

   return iDtsNowInSeconds;
};

function determineElapsedTimeInSeconds( iStartTimeInSeconds ) {
   var iElapsedTime = determineTimeNowInSeconds() - iDtsStartupInSeconds;

   return iElapsedTime;
};

var iDtsStartupInSeconds = determineTimeNowInSeconds();
log.info('readiness startup requested at epoch time: %d', iDtsStartupInSeconds);

// register a callback to handle configuration reload properly
process.on('SIGHUP', function () {
  log.info('readiness server caught SIGHUP, reloading configuration');
  // TODO: reload the configuration and then update the variables
});

// register a callback to handle shutdown properly
process.on('SIGTERM', function () {
  oServerReport.close(function () {
    var iDtsNowInSeconds = determineTimeNowInSeconds();
    var iElapsedTime = determineElapsedTimeInSeconds( iDtsNowInSeconds );
    log.info('readiness server caught SIGTERM, shutdown requested at epoch time %d after running for %d seconds', iDtsNowInSeconds, iElapsedTime);
    process.exit(0);
  });
});

// create the server handler for the report
var oServerReport = http.createServer(function (req, res) {
   res.writeHead(200, {'Content-Type': 'text/json'});
   res.end(sReportData);
}).listen(iPortNumber);

log.info('readiness server running at port %d', iPortNumber);

// create the handler for the checks
function handlerChecker() {
   var iDtsNowInSeconds = determineTimeNowInSeconds();
   var iElapsedTime = determineElapsedTimeInSeconds( iDtsNowInSeconds );
   log.info('readiness server handlerChecker awake at epoch time %d after running for %d seconds', iDtsNowInSeconds, iElapsedTime);

   // request a call to ourselves after a delay to start the check
   // cycle again
   setTimeout(handlerChecker, iWaitTimeInMilliseconds);
};

// TODO: perform the application loop

// handlerChecker();
setTimeout(handlerChecker, iWaitTimeInMilliseconds);


