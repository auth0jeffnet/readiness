// declare variables for the require objects
var http = require('http');
var bunyan = require('bunyan');
var fs = require('fs');

// the port number for the report
portNumber = 54321;
// the fodler for the plugins
var nameFolderPlugins = '/opt/auth0/readiness/appcode/plugins/';
// the log file for the service
nameFileLogInfo = '/tmp/readiness-info.log'
// the "sleep" time between polling intervals
loopTimeMilliseconds = 60000;
// the initial report data
sReportData = '{"readiness":"readiness is not yet ready"}';

// declare a bunyan logging instance
var log = bunyan.createLogger({
  name: "readiness",
  level: 0,
  streams: [
    {
      level: 'info',
      path: nameFileLogInfo
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

// checks for directory existence
function checkExistenceDirectory(sDirectoryName) {
  bReturnValue = false;
  try {
    fs.statSync(sDirectoryName);
    log.info('detected directory exists: %s', sDirectoryName);
    bReturnValue = true;
  } catch(eEx) {
    log.info('detected directory does not exist: %s', sDirectoryName);
  };
  return bReturnValue;
};

function closeReportHandler() {
  var iDtsNowInSeconds = determineTimeNowInSeconds();
  var iElapsedTime = determineElapsedTimeInSeconds( iDtsNowInSeconds );
  log.info('readiness server caught SIGTERM, shutdown requested at epoch time %d after running for %d seconds', iDtsNowInSeconds, iElapsedTime);
  process.exit(0);
};

function catchSigHup() {
  log.info('readiness server caught SIGHUP, reloading configuration not yet implemented');
  // TODO: reload the configuration and then update the variables
  // TODO: for reloading the "require"d plugin files, this methodology of removing
  // the resolve configuration may prove useful: https://github.com/lorenwest/node-config/issues/34
};

function catchSigTerm() {
  oServerReport.close(closeReportHandler);
};

function registerSignalHandlers() {
  // register a callback to handle shutdown properly
  process.on('SIGTERM', catchSigTerm);

  // register a callback to handle configuration reload properly
  process.on('SIGHUP', catchSigHup);
};

// the handler for obtaining results from the plugins
function handlePluginResultsCallback(sResults) {
  // set a variable with the parsed JSON results
  var jsonContent = JSON.parse(sResults);

  // copy the original data object
  var oDataOriginal = JSON.parse(sReportData);

  // remove the "readiness is not yet ready" associated with the readiness
  // key if it is still within the data
  if("readiness" in oDataOriginal) {
    delete oDataOriginal["readiness"];
  };

  if(jsonContent.hasOwnProperty('name')){
    // update the results for this plugin name with the entire response
    // from the plugin
    var keyNameWithinResults = jsonContent.name;
    oDataOriginal[ keyNameWithinResults ] = sResults;
  }
  else {
    log.info('name not found within response, not updating report data: %s',jsonContent);
    return;
  };

  // write a string of the updated object to the report variable
  sReportData = JSON.stringify(oDataOriginal);

  // log the response
  log.debug('updated report data: %s',sReportData);
};

// loads and runs the Node.js plugins in the plugins folder
function loadAndRunPlugins() {
  // load and start the plugins
  fs.readdir(nameFolderPlugins, (err, files) => {
    files.forEach(file => {
      log.debug('readiness found file within plugin folder: %s', file);
      // TODO: this should handle other extensions such as python py, bash scripts, etc.
      if( file.endsWith('.js') == true ) {
        log.debug('readiness found file with .js extension: %s', file);
        var sRequireFileName = file.substring( 0, file.indexOf( ".js" ) );
        var sRequireFile = './plugins/'+sRequireFileName;
        var plugin = require( sRequireFile );
        if(plugin.name !== undefined) {
          if(plugin.runPlugin !== undefined) {
            log.info('readiness found plugin: %s', file);
            plugin.runPlugin(log,handlePluginResultsCallback);
          }
          else {
            log.info('readiness found file without .runPlugin function, not treating as a plugin: %s', file);
          };
        }
        else {
          log.info('readiness found file without .name attribute, not treating as a plugin: %s', file);
        };
      }
      else {
        log.info('readiness found file without .js extension, not treating as a plugin: %s', file);
      };
    });
  });
};

// the self-calling loop for the plugins
function runPluginLoop() {
  // load and run the plugins
  loadAndRunPlugins();

  // call ourselves to run the plugins after a delay
  setTimeout(runPluginLoop,loopTimeMilliseconds);
};

var iDtsStartupInSeconds = determineTimeNowInSeconds();
log.info('readiness startup requested at epoch time: %d', iDtsStartupInSeconds);

// determine if the plugins folder exists
if( checkExistenceDirectory(nameFolderPlugins) == false ) {
  log.error('readiness unable to find plugin folder: %s', nameFolderPlugins);
  // while this directory could be created using the code
  // fs.mkdirSync(sDirectoryName);
  // this is probably the least-expected action since the
  // user would likely have specified a plugin folder they
  // expected to exist
  return;
};

log.info('readiness found plugin folder: %s', nameFolderPlugins);

registerSignalHandlers();

// create the server handler for the report data
var oServerReport = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/json'});
  res.end(sReportData);
}).listen(portNumber);

log.info('readiness server running at port %d, starting plugin loop', portNumber);

// start running the plugins
runPluginLoop();



