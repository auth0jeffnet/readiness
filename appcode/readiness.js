// declare variables for the require objects
var http = require('http');
var bunyan = require('bunyan');
var fs = require('fs');

////////////////////////////////////////////////////////////////
// configuration: TODO: should go into a configuration file
////////////////////////////////////////////////////////////////
// the port number for the report
iPortNumber = 54321;
// the log file for the service
sLogFileInfoLog = '/tmp/readiness-info.log'
var sFolderNamePlugins = './plugins/';
// whlie these are the default settings, they are specified here
// to keep the code the same if there are other desired settings
iPortRedis = 6379;
sHostRedis = '127.0.0.1';
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

log.info('readiness server running loop for tests via plugins' );

// checks for directory existence synchronously
// synchronous operations are great for performing one-time file/directory
// operations before returning a module. For example, bootstrapping a
// configuration file
function checkExistenceDirectory(sDirectoryName) {
  bReturnValue = false;
  try {
    fs.statSync(sDirectoryName);
    bReturnValue = true;
  } catch(eEx) {
    log.info('detected directory does not exist: %s', sDirectoryName);
  };
  return bReturnValue;
};

// determine if the plugins folder exists
if( checkExistenceDirectory(sFolderNamePlugins) == false ) {
  log.info('readiness unable to find plugin folder: %s', sFolderNamePlugins);
  // while this directory could be created using the code
  // fs.mkdirSync(sDirectoryName);
  // this is probably the least-expected action since the
  // user would likely have specified a plugin folder they
  // expected to exist
} else {
  log.info('readiness found plugin folder: %s', sFolderNamePlugins);
};

function handlePluginResultsCallback(log,sResults) {
   // set a variable with the parsed JSON results
   var jsonContent = JSON.parse(sResults);
   // copy the original data object
   var oDataOriginal = JSON.parse(sReportData);
   // update the results for this plugin name with the entire response
   oDataOriginal[ jsonContent.name ] = sResults;
   // write a string of the updated object to the report variable
   sReportData = JSON.stringify(oDataOriginal);
   log.info('finished output response: %s',sReportData);
};

fs.readdir(sFolderNamePlugins, (err, files) => {
  files.forEach(file => {
    log.info('readiness found file within plugin folder: %s', file);
    // TODO: this should handle other extensions such as python py, bash scripts, etc.
    if( file.endsWith('.js') == true ) {
      log.info('readiness found file with .js extension: %s', file);
      var sRequireFileName = file.substring( 0, file.indexOf( ".js" ) );
      var sRequireFile = "./plugins/"+sRequireFileName;
      var plugin = require( sRequireFile );
      plugin.runPlugin(log,handlePluginResultsCallback);
      log.info('readiness obtained plugin name: %s',plugin.name);
    } else {
      log.info('readiness found file without .js extension, not treating as a plugin: %s', file);
    };
  });
});

// perform the application loop
// To start the checker instantly, call it directly: handlerChecker();
// To start the checker after its normal delay, call it via a timeout: setTimeout(handlerChecker, iWaitTimeInMilliseconds);
// setTimeout(handlerChecker, iWaitTimeInMilliseconds);
handlerChecker();


