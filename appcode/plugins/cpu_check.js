
os = require('os');

module.exports = {

   frequency_in_seconds: 30,
   version: "20180718r001",
   name: "cpu_check",
   summary: "Checks the CPU details",
   description: "Checks the CPU details using the os.cpus() method",
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
      sData += JSON.stringify( os.cpus() );

      sData += '}';

      return sData;
   }

};
