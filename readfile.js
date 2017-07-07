var express=require('express');
var app=express();
var logger=function(req,res,next){
	console.log(req.method,req.url);
	next();
};
var helloWorld=function(req,res,next){
res.send('Hello World 1 2 3');
	next();
};
app.use('/',helloWorld);
app.listen(3000);
console.log('Server ruining at port 3000');
module.exports=app;