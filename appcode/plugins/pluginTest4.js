
module.exports = {

   frequency_in_seconds: 0,
   version: "20180718r001",
   name: "Test Plugin 4 at 0 seconds (check once only)",
   summary: "Performs a test only once",
   description: "Performs a TODO SOME KIND OF TEST only once at readiness service startup",

   runPlugin: function(log,fxResultsCallback) {
      sReturnData = '{"name": "' + this.name + '"}';
      fxResultsCallback(log,sReturnData);
   }

};

