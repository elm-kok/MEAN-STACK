var car=function (engine) {
	this.engine=engine;	
};
car.prototype.start = function(argument){
	car.engine.start();
};
module.exports=car;