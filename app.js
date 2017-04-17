var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser'); 
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
//	assert = require('assert');
var passport =require('passport');
var LocalStrategy = require('passport-local').Strategy;
var config = require('./config');

//var url = 'mongodb://localhost:27017/confusion';
mongoose.connect(config.mongourl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
console.log("Connected correctly to server");
});
/*
var Dishes = require('./models/dishes1');
var Promotions = require('./models/Promotions');
var Leaders = require('./models/leaders');
*/
//var routes = require('./routes/index');
//var users = require('./routes/users');
var dishRouter = require('./routes/dishRouter');
//var promoRouter = require('./routes/promoRouter');
//var leaderRouter = require('./routes/leaderRouter');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));

//app.use('/',routes);
//app.use('/users',users);
app.use('/dishes',dishRouter);
//app.use('/promotions',promoRouter);
//app.use('/leadership',leaderRouter);


/*type-1 way-1

	var newDish=Dishes({
		name:'Uthapizza',
		description:'Test'
	});

	newDish.save(function(err){
		if(err) throw err;

		console.log('dish created!');

		Dishes.find({},function(err,dishes){
			if(err) throw err;

			console.log(dishes);
		});

	});
*/


/* type-2

	Dishes.create({
		name:'Uthalapizza',
		description:'Test'
	},function(err,dish){
		if(err) throw err;

		console.log(dish);
		var id = dish._id;

		setTimeout(function(){
			Dishes.findByIdAndUpdate(id,{
				$set:{
					description:'Updated Test'
					}
				},{
					new:true
			}).exec(function(err,dish){
				if(err) throw err;
				console.log('Updated Dish!');
				console.log(dish);
				db.collection('dishes').drop();
				db.close();
			});
		},3000);

	});

*/
/*
		Dishes.create({
		name:'Uthalapizza',
		image:'images/Uthalapizza.png',
		category:'mains',
		label:'Hot',
		price:'$4.99',
		description:'unique',
		comments:[{
			rating:3,
			comment:'this is insane',
			author:'masterji'
		}
		]
	},function(err,dish){
		if(err) throw err;

		console.log(dish);
		var id = dish._id;

		setTimeout(function(){
			Dishes.findByIdAndUpdate(id,{
				$set:{
					description:'Updated Test'
					}
				},{
					new:true
			}).exec(function(err,dish){
				if(err) throw err;
				console.log('Updated Dish!');
				console.log(dish);
				db.collection('dishes').drop();
				db.close();
			});
		},3000);

	});

		Promotions.create({
			name:"Weekend Grand Buffet",
			image:"images/buffet.png",
			label:"New",
			price:"$19.99",
			description:"Featuring..."},
			function(err,promotion){
			if(err) throw err;

			console.log(promotion);
			var id = promotion._id;

			setTimeout(function(){
				Promotions.findByIdAndUpdate(id,{
					$set:{
						description:'Updated Test'
						}
					},{
						new:true
				}).exec(function(err,dish){
					if(err) throw err;
					console.log('Updated Dish!');
					console.log(promotion);
					db.collection('promotions').drop();
					db.close();
				});
			},3000);
		});

		Leaders.create({
			name:"Weekend Grand Buffet",
			image:"images/buffet.png",
			designation:"Chief Executing Officer",
			abbr:"CEO",
			description:"Our ceo"},
			function(err,leader){
			if(err) throw err;

			console.log(leader);
			var id = leader._id;

			setTimeout(function(){
				Leaders.findByIdAndUpdate(id,{
					$set:{
						description:'Updated Test'
						}
					},{
						new:true
				}).exec(function(err,leader){
					if(err) throw err;
					console.log('Updated Dish!');
					console.log(leader);
					db.collection('leaders').drop();
					db.close();
				});
			},3000);
		});
	

	

});
*/
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(3000,function(){
	console.log("app is listening on port 3000");
});

module.exports = app;