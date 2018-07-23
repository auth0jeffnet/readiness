
var child_process = require('child_process');

var sCurlRequest = '/usr/bin/curl --max-time 10 http://apt-mirror.it.auth0.com';

module.exports = {
  frequency_in_seconds: 15,
  version: "20180718r001",
  name: "curl_check_updates_http",
  summary: "Performs a curl connectivity test against the URL http://apt-mirror.it.auth0.com",
  description: "Performs a curl connectivity test against the URL http://apt-mirror.it.auth0.com with a timeout of 10 seconds",
  helplink: "https://auth0.com/docs/appliance/infrastructure/ip-domain-port-list",

  runPlugin: function(log,fxResultsCallback) {
    this.getData(log);
    sReturnData = this.renderPluginData(log);
    fxResultsCallback(sReturnData);
  },

  getData: function(log) {
    try {
      this.outputObject = child_process.execSync(sCurlRequest, (err, stdout, stderr) => {
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

