var express=require('express');
var bodyParser=require('body-parser');
var morgan=require('morgan');
module.exports=function () {
	var app=express();
	if(process.env.NODE_ENV==='development'){
		app.use(morgan('dev'));
	}else{
		app.use(compression);
	}
		app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.set('views','./app/views');
	app.set('view engine','jade');
	app.use(bodyParser.json());
	require('../app/routes/index.route')(app);
	return app;
}