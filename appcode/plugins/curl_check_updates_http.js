
var child_process = require('child_process');

sCurlRequest = '/usr/bin/curl --max-time 10 --stderr - http://apt-mirror.it.auth0.com';

module.exports = {
  frequency_in_seconds: 15,
  version: "20180718r001",
  name: "curl_check_updates_http",
  summary: "Performs a curl connectivity test against the URL http://apt-mirror.it.auth0.com",
  description: "Performs a curl connectivity test against the URL http://apt-mirror.it.auth0.com with a timeout of 10 seconds",
  helplink: "https://auth0.com/docs/appliance/infrastructure/ip-domain-port-list",

  runPlugin: function(log,fxResultsCallback) {
    sPluginData = this.getData(log);
    sReturnData = this.renderPluginData(log,sPluginData);
    fxResultsCallback(log,sReturnData);
  },

  getData: function(log) {
    sOutput = "";
    try {
      sOutput = child_process.execSync(sCurlRequest, (err, stdout, stderr) => {
        sOutput += stdout;
        sOutput += stderr;
      });
    } catch (ex) {
      sOutput += ex.stdout;
      sOutput += ex.stderr;
    };
    return sOutput;
  },

  renderPluginData: function(log,sPluginData) {
    this.results = sPluginData;
    return JSON.stringify(this);
  }

};

