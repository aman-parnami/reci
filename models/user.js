var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var user = new Schema({
	username:String,
	password:String,
	firstname:{
		type:String,
		default:""
	},
	lastname:{
		type:String,
		default:""
	},
	admin:{
		type:Boolean,
		default:false
	}
});

user.methods.getName=function(){
	return(this.firstname+ ' ' + this.lastname);
};

user.plugin(passportLocalMongoose);
module.exports =mongoose.model('User',user);