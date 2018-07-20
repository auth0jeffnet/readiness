
var fs = require('fs');

module.exports = {

   frequency_in_seconds: 0,
   version: "20180718r001",
   name: "mem_check_proc_meminfo",
   summary: "Checks the system memory details",
   description: "Checks the system memory details using the output from /proc/meminfo",
   helplink: "https://auth0.com/docs/appliance/infrastructure/virtual-machines",
   sLocalResults: "",

   runPlugin: function(log,fxResultsCallback) {
      sReturnData = this.doPluginDetails(log,this.sLocalResults);
      fxResultsCallback(log,sReturnData);
   },

   doPluginDetails: function(log,sOutput) {
      sProcInfo = fs.readFileSync('/proc/meminfo', 'utf8');

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
      sData += JSON.stringify( sProcInfo );

      sData += '}';

      return sData;
   }
};


