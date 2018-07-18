
iFrequencyInSeconds = 30;
sVersionPlugin = "20180718r001";
sNamePlugin = "Test Plugin 2 at 30 seconds";

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

