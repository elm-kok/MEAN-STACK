var http=require('http');
http.createServer(function (req,res) {
	res.writeHead(200,{'Content-type':'text/plian'});
	res.end('Hello World');
}).listen(3000);