
module.exports = {

   frequency_in_seconds: 60,
   version: "20180718r001",
   name: "Test Plugin 1 at 60 seconds",
   summary: "Performs a test every 60 seconds",
   description: "Performs a TODO SOME KIND OF TEST test every 60 seconds (once per minute)",

   runPlugin: function(log,fxResultsCallback) {
      sReturnData = '{"name": "' + this.name + '"}';
      fxResultsCallback(log,sReturnData);
   }

};

