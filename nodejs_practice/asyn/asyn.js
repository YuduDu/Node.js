var fs = require('fs');
var http = require('http');
var path = './1.txt';

//check if 1.txt exists
fs.stat(path,function(err,stats){
	if(stats == undefined){
		//fetch http headers
		var options = {
			host:'www.google.com',
			port: 80
		};
		http.get(options,function(res){
			var headers = JSON.stringify(res.headers);
			//write headers to headers.txt
			fs.writeFile(path, headers, function(err){
				console.log('Done.');
			});
		});
	}
	else{ console.log('we already had that file.');
	}
});