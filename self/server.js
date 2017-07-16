process.env.NODE_ENV='development' || process.env.NODE_ENV;
var express=require('./config/express');
var app=express();
app.listen(3000);
module.exports=app;
console.log('Running at port 3000');
