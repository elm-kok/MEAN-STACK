var express = require('express');
var config = require('./config');
var morgan=require('morgan');
var flash=require('connect-flash');
var sass=require('node-sass-middleware');
var validator=require('express-validator');
var session=require('express-session');
var passport=require('passport');
var compression =require('compression');
var bodyParser=require('body-parser');
module.exports=function () {
	var app=express();
	if(process.env.NODE_ENV==='development'){
		app.use(morgan('dev'));
	}else{
		app.use(compression);
	}
	app.use(flash());
	app.use(session({
		secret: config.sessionSecret,
		resave: false,
		saveUninitialized:true
	}));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(validator());
	app.set('views',['./app/views','./public']);
	app.set('view engine','jade');
	require('../app/routes/index.server.routes')(app);
	require('../app/routes/user.server.routes')(app);
	require('../app/routes/partial.server.routes')(app);
	app.use(sass({
		src:'./sass',
		dest:'./public/css',
		outputStyle: 'compressed',
		prefix:'/css',
		debug:true
	}));
	app.use(express.static('./public'));
	return app;
};