
iFrequencyInSeconds = 60;
sVersionPlugin = "20180718r001";
sNamePlugin = "Test Plugin 1 at 60 seconds";

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

