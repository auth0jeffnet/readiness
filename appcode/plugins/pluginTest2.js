
module.exports = {

   frequency_in_seconds: 30,
   version: "20180718r001",
   name: "Test Plugin 2 at 30 seconds",
   summary: "Performs a test every 30 seconds",
   description: "Performs a TODO SOME KIND OF TEST test every 30 seconds (twice per minute)",

   runPlugin: function(log,fxResultsCallback) {
      sReturnData = '{"name": "' + this.name + '"}';
      fxResultsCallback(log,sReturnData);
   }

};

