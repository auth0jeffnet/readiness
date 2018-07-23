
var child_process = require('child_process');

var sCurlRequest = '/usr/bin/curl --max-time 10 --stderr - http://apt-mirror.it.auth0.com';

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
      this.output = child_process.execSync(sCurlRequest, (err, stdout, stderr) => {
        this.stdout = stdout;
        this.stderr = stderr;
      });
    } catch (ex) {
      this.stdout = ex.stdout;
      this.stderr = ex.stderr;
    };
  },

  renderPluginData: function(log) {
    return JSON.stringify(this);
  }

};

