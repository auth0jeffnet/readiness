
diskusage = require('diskusage');

path = '/dev/sda/'
path = '/'

module.exports = {

   frequency_in_seconds: 60,
   version: "20180718r001",
   name: "disk_check_slash",
   summary: "Checks the disk space of / (slash)",
   description: "Checks the disk space of / (slash) using the diskusage.checkSync() method",
   helplink: "https://auth0.com/docs/appliance/infrastructure/virtual-machines",

   runPlugin: function(log,fxResultsCallback) {
      sReturnData = this.doPluginDetails(log);
      fxResultsCallback(log,sReturnData);
   },

   doPluginDetails: function(log) {
      sData = '{';

      sData += '"name"';
      sData += ': ';
      sData += '"';
      sData += this.name;
      sData += '"';

      sData += ',';

      sData += '"helplink"';
      sData += ': ';
      sData += '"';
      sData += this.helplink;
      sData += '"';

      sData += ',';

      sData += '"results"';
      sData += ': ';
      sData += JSON.stringify( diskusage.checkSync(path) );

      sData += '}';

      return sData;
   }
};

