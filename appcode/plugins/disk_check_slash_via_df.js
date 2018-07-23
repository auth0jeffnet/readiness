
var child_process = require('child_process');

var path = '/'

var commandToPerform = 'df -k ' + path;

module.exports = {
  frequency_in_seconds: 60,
  version: "20180718r001",
  name: "disk_check_slash_via_df",
  summary: "Checks the disk space of / (slash)",
  description: "Checks the disk space of / (slash) using the df -h method",
  helplink: "https://auth0.com/docs/appliance/infrastructure/virtual-machines",

  runPlugin: function(log,fxResultsCallback) {
    this.getData(log);
    sReturnData = this.renderPluginData(log);
    fxResultsCallback(sReturnData);
  },

  getData: function(log) {
    try {
      this.outputObject = child_process.execSync(commandToPerform, (err, stdout, stderr) => {
        this.stdout = stdout;
        this.stderr = stderr;
      });
    } catch (ex) {
      this.stdout = ex.stdout;
      this.stderr = ex.stderr;
    };
  },

  renderPluginData: function(log) {
    if("outputObject" in this) {
      this.outputAsText = this.outputObject.toString('utf8');
    };
    if("stdout" in this) {
      this.stdoutAsText = this.stdout.toString('utf8');
    };
    if("stderr" in this) {
      this.stderrAsText = this.stderr.toString('utf8');
    };
    return JSON.stringify(this);
  }

};

