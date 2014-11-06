var server=require("./server");
var router=require("./router");
var requestHandlers=require("./requestHandlers");

var handle={}
handle["/"]=requestHandlers.show;
handle["/show"]=requestHandlers.show;
handle["/add"]=requestHandlers.add;


server.start(router.route, handle);