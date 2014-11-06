var fs = require('fs');
var async = require('async');
var http = require('http');
var path = './1.txt';

async.waterfall(
	[
		//check if 1.txt exists
		function(callback){
			fs.stat(path,function(err,stats){
				if(stats == undefined){callback(null);}
				else {console.log('1.txt already collected');}
			});
		},
		
		// fetch the http header
		function(callback){
			var options = {
				host: 'www.google.com',
				port:80
			};
			http.get(options, function(res){
				var headers = JSON.stringify(res.headers);
				callback(null, headers);
			});
		},
		
		//write the header into the file
		function(headers, callback){
			fs.writeFile(path, headers, function(err){
				console.log('Done');
				callback(null,':D');
			});
		}
	],
	
	function(err,status){
		console.log(status);
	}
);