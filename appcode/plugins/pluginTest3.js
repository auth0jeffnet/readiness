
module.exports = {

   frequency_in_seconds: 15,
   version: "20180718r001",
   name: "Test Plugin 3 at 15 seconds",
   summary: "Performs a test every 15 seconds",
   description: "Performs a TODO SOME KIND OF TEST test every 15 seconds (four times per minute)",

   runPlugin: function(log,fxResultsCallback) {
      sReturnData = '{"name": "' + this.name + '"}';
      fxResultsCallback(log,sReturnData);
   }

};

