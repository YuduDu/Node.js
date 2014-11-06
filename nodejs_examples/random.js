var http = require("http");
var url = require("url");

http.createServer(function(request,response){
	response.writeHead(200,{"Content-Type":"text/plain"});
	
	var params = url.parse(request.url.true).query;//daisikao 
	var input = params.number;
	
	var numInput= new Number(input);
	var numOutput = new Number(Math.random()*numInput).toFixed(0);
	
	response.write(numOutput);
	response.end();
}).listen(8888);

console.log("Random Number Generator Running...");