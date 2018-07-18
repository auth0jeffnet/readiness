
iFrequencyInSeconds = 15;
sVersionPlugin = "20180718r001";
sNamePlugin = "Test Plugin 3 at 15 seconds";

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

