
var querystring = require("querystring"),
	fs = require("fs"),
	qs=require("querystring");

var proverbs = ["The last man on Earth sat alone in a room. There was a lock on the door . . .",
				"When he awoke, the dinosaur was still there.",
				"Longed for him. Got him. Shit.",
				"Good God, I\’m pregnant; I wonder who did it.",
				"Computer, did we bring batteries? Computer?"];
function show(response,request){
	console.log("Request handler 'show' was called.");
	
	var body = '<html>'
			 + '<head>'
			 + '<meta http-equiv="Content-Type" content="text/html; '
			 + 'charset=UTF-8" />'
			 + '</head>'
             + '<body style="font-size: 4em;line-height: 1.2; margin-top: 200;">'
             + '<blockquote>'+ proverbs[Math.floor(Math.random()* proverbs.length)]
                + '</blockquote>' + '</body>'
			 + '</html>'; 

	 response.writeHead(200, {"Content-Type": "text/html"}); 
	 response.write(body);
	 response.end(); 

}

function add(response,request){
	console.log("Request handler 'upload' was called.");
	if(request.method.toLowerCase() == 'post'){
		var postData = '';
		request.on('data', function(data){
			postData+=data;
		});
		request.on('end',function(){
			var POST = qs.parse(postData);
			
			proverbs.push(POST.text); 

	 		var body = '<html>'
			 + '<head>'
			 + '<meta http-equiv="Content-Type" content="text/html; '
			 + 'charset=UTF-8" />'
			 + '</head>'
             + '<body style="font-size: 4em;line-height: 1.2; margin-top: 200;">'
			 + '<blockquote>' + POST.text + '</blockquote>' + '</body>'
			 + '</html>'; 

	 response.writeHead(200, { 
		"Content-Type" : "text/html"
	 }); 
	 response.write(body); 
	 response.end(); 

		});
		}else{
			addpage(response);
		}
}

function addpage(response){
	var body = '<html>'
			 + '<head>'
			 + '<meta http-equiv="Content-Type" content="text/html; '
			 + 'charset=UTF-8" />'
			 + '</head>'
             + '<body style="font-size: 4em;line-height: 1.2; margin-top: 200;">'
			 + '<form action="/add" method="post">'
			 + '<textarea name="text" rows="10" cols="60"></textarea>'
			 + '<input type="submit" value="Submit" />' + '</form>' + '</body>'
			 + '</html>'; 

	 response.writeHead(200, { 
		"Content-Type" : "text/html"
	 }); 
	 response.write(body); 
	 response.end(); 
}


exports.show=show;
exports.add=add;