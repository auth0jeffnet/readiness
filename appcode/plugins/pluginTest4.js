
iFrequencyInSeconds = 0;
sVersionPlugin = "20180718r001";
sNamePlugin = "Test Plugin 4 at 0 seconds (check once only)";

module.exports = {

   getDesiredFrequencyInSeconds: function(log) {
      return iFrequencyInSeconds;
   },
   getPluginVersion: function(log) {
      return sVersionPlugin;
   },
   getPluginName: function(log) {
      return sNamePlugin;
   }

};

