
var fs = require('fs');

module.exports = {
  frequency_in_seconds: 0,
  version: "20180718r001",
  name: "mem_check_proc_meminfo",
  summary: "Checks the system memory details",
  description: "Checks the system memory details using the output from /proc/meminfo",
  helplink: "https://auth0.com/docs/appliance/infrastructure/virtual-machines",

  runPlugin: function(log,fxResultsCallback) {
    sReturnData = this.doPluginDetails(log);
    fxResultsCallback(log,sReturnData);
  },

  doPluginDetails: function(log) {
    this.data = fs.readFileSync('/proc/meminfo', 'utf8');
    return JSON.stringify(this);
  }

};

