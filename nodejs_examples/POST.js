var http = require('http'),
	querystring = require('querystring'),
	util = require('util');

http.createServer(function(req,res){

	var post='';
	req.on('data',function(chunk){
		post+= chunk;
	});
	
	req.on('end',function(){
		post = querystring.parse(post);
		res.writeHead(200,{'Content-Type':'text/plain'});
		res.end(util.inspect(post));	
	});
	
}).listen(8888);