var mongoose=require('mongoose');
var crypto=require('crypto');
var Schema=mongoose.Schema;
var UserSchema=new Schema({
	firstName: String,
	lastName: String,
	username:{type: String,unique: true,trim:true,require:true
		,require:'Username is required'},
	password:{type:String
		,validate:[function (password){
		return password && password.length>=6;
	},
	'Password must be at least 6 characters'
	]
},		salt:{
			type:String
		},provider:{
			type:String,
			require:'Provider is required'
		},providerId:String,
		providerData:{},
	email:{type:String,index:true,match:/.+\@.+\.+/},
	created:{
		type:Date,
		default:Date.now
	},
	role:{
		type:String,
		enum:['Admin','Owner','User']
	}
});
UserSchema.pre('save',function (next) {
	if(this.password){
		this.salt=new Buffer(crypto.randomBytes(16).toString('base64'),'base64');
		this.password=this.hashPassword(this.password);}
		next();
});
UserSchema.methods.hashPassword=function (password) {
	return crypto.pbkdf2Sync(password,this.salt,10000,64).toString('base64');
};
UserSchema.methods.authenticate=function (password) {
	return this.password===this.hashPassword(password);
};
UserSchema.statics.findUniqueUsername=function (username,suffix,callback) {
	var _this=this;
	var possibleUsername=username+(suffix||'');
	_this.findOne({
		username:possibleUsername
	},function (err,user) {
		if(!err){
		if(!user) callback(possibleUsername);
		else return _this.findUniqueUsername(username,(suffix||0)+1,callback);
	} else {
      callback(null);
	}});
};
mongoose.model('User',UserSchema);