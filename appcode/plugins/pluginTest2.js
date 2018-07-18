
iFrequencyInSeconds = 30;
sVersionPlugin = "20180718r001";
sNamePlugin = "Test Plugin 2 at 30 seconds";
sDescriptionPluginShort = "Performs a test every 30 seconds";
sDescriptionPluginLong = "Performs a TODO SOME KIND OF TEST test every 30 seconds (twice per minute)";

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

