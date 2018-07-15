http=require('http')

iPortNumber = 54321;

http.createServer(function (req, res) {
   res.writeHead(200, {'Content-Type': 'text/plain'});
   res.end('readiness is not yet ready\n');
}).listen(iPortNumber);

console.log('readiness server running at port %d', iPortNumber);

