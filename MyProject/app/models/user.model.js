var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var UserSchema=new Schema({
	firstName: String,
	lastName: String,
	username:{type: String,unique: true},
	password:String,
	email:{type:String,index:true}
});
mongoose.model('User',UserSchema);