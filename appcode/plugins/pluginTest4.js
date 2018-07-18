
iFrequencyInSeconds = 0;
sVersionPlugin = "20180718r001";
sNamePlugin = "Test Plugin 4 at 0 seconds (check once only)";
sDescriptionPluginShort = "Performs a test only once";
sDescriptionPluginLong = "Performs a TODO SOME KIND OF TEST only once at readiness service startup";

module.exports = {

   getDesiredFrequencyInSeconds: function(log) {
      return iFrequencyInSeconds;
   },
   getPluginVersion: function(log) {
      return sVersionPlugin;
   },
   getPluginDescriptionShort: function(log) {
      return sDescriptionPluginShort;
   },
   getPluginDescriptionLong: function(log) {
      return sDescriptionPluginLong;
   },
   getPluginName: function(log) {
      return sNamePlugin;
   }

};

