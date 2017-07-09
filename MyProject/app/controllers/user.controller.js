exports.login=function (req,res) {
	req.checkBody('email','Invalid email').notEmpty().isEmail();
	req.sanitizeBody('email').normalizeEmail();
	var errors =req.validationErrors();
	if(errors){
		res.render('index',{
			title: 'Error '+JSON.stringify(errors),
			isLoggedIn: false
		});
		return;
	}
	console.log(req.body);
	console.log('Email: '+req.body.email);
	console.log("Password: "+req.body.password);
	if(req.body.remember==='remember'){
		req.session.remember=true;
		req.session.email=req.body.email;
	}	
	res.render('index',{
		title:'Logged in as '+req.body.email,
		isLoggedIn: true
	});
};
exports.logout=function (req,res) {	
	req.session=null;
	res.render('index',{
		title:'See you again later',
		isLoggedIn: false
	});
};
var User=require('mongoose').model('User');
exports.create=function (req,res,next) {
	var user=new User(req.body);
	user.save(function (err) {
	if(err){
		return next(err);
	}else{
		res.json(user);
	}
	});
};