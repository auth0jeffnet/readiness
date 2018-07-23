
var diskusage = require('diskusage');

var path = '/'

module.exports = {
  frequency_in_seconds: 60,
  version: "20180718r001",
  name: "disk_check_slash",
  summary: "Checks the disk space of / (slash)",
  description: "Checks the disk space of / (slash) using the diskusage.checkSync() method",
  helplink: "https://auth0.com/docs/appliance/infrastructure/virtual-machines",

  runPlugin: function(log,fxResultsCallback) {
    sReturnData = this.doPluginDetails(log);
    fxResultsCallback(sReturnData);
  },

  doPluginDetails: function(log) {
    this.data = diskusage.checkSync(path);
    return JSON.stringify(this);
  }

};

