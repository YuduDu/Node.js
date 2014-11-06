var fs = require('fs');

exports.enc=function(src,dst,key) {
	var rs = fs.createReadStream(src);
	var ws = fs.createWriteStream(dst);
	var bKey = new Buffer(key);
	var kL = bKey.length;
	var m = 0;
	rs.on('data', function (chunk) {
		console.log(chunk);
		for(var i=0;i<chunk.length;i++)
		{
			console.log(chunk[i] + ' key: ' + bKey[m]+ ' ; ');
			chunk[i]=chunk[i] ^ bKey[m];
			console.log('enc: '+ chunk[i]);
			if(++m == kL)
				m=0;
		}
		console.log(chunk);
		var str = chunk.toString('utf-8');
    	if (ws.write(str) === false) {
        	rs.pause();
    	}
		});

	rs.on('end', function () {
    	ws.end();	
	});

	ws.on('drain', function () {
    	rs.resume();
	});
    
}

exports.dec = function(src, dst, key) {
	var rs = fs.createReadStream(src,function(err){
		if(err){
			console.log(err);
		}
	});
	var ws = fs.createWriteStream(dst);
	var bKey = new Buffer(key);
	var kL = bKey.length;
	var m = 0;
	rs.on('data', function (chunk) {
		for(var i=0;i<chunk.length;i++)
		{
			console.log(chunk[i] + ' key: ' + bKey[m]+ ' ; ');
			chunk[i]=chunk[i] ^ bKey[m];
			console.log('dec: '+ chunk[i]);
			if(++m == kL)
				m=0;
		}
		console.log(chunk);
		var str = chunk.toString('utf-8');
    	if (ws.write(str) === false) {
        	rs.pause();
    	}
		});

	rs.on('end', function () {
    	ws.end();	
	});

	ws.on('drain', function () {
    	rs.resume();
	});
}
