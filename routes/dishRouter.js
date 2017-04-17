var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Verify =require('./verify')

var Dishes = require('../models/dishes1');


var dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')
.get(Verify.verifyOrdinaryUser,function(req,res,next){
	Dishes.find({})
	.populate('comments.postedBy')
	.exec(function(err,dish){

		if (err) throw err;
		res.json(dish);
	});
})

.post(Verify.verifyOrdinaryUser,function(req,res,next){
	Dishes.create(req.body,function(err,dish){
		if (err) throw err;
		console.log('dish created!');
		var id = dish._id;

		res.writeHead(200,{
			'Content-Type':'text/plain'
		});
		res.end('Added the dish with id:' +id);
	});
})

.delete(Verify.verifyOrdinaryUser,function(req,res,next){
	Dishes.remove({},function(err,dish){
		if (err) throw err;
		res.json(dish);
	});
});

dishRouter.route('/:dishId')
.get(function(req,res,next){
	Dishes.findById(req.params.dishId)
	.populate('comments.postedBy')
	.exec(function(err,dish){
		if (err) throw err;
		res.json(dish);
	});
})

.put(function (req, res, next) {
    Dishes.findByIdAndUpdate(req.params.dishId, {
        $set: req.body
    }, {
        new: true
    }, function (err, dish) {
        if (err) throw err;
        res.json(dish);
    });
})

.delete(function(req,res,next){
	Dishes.findByIdAndRemove(req.params.dishId,function(err,resp){
		if (err) throw err;
		res.json(resp);
	});
});


dishRouter.route('/:dishId/comments')
.get(function(req,res,next){
	Dishes.findById(req.params.dishId,function(err,dish){
		if (err) throw err;
		res.json(dish.comments);
	});
})

.post(function(req,res,next){
	Dishes.findById(req.params.dishId,function(err,dish){
		if (err) throw err;
		dish.comments.push(req.body);
		dish.save(function(err,dish){
			if (err) throw err;
			console.log('Updated Comments!');
			res.json(dish);
		});
	});
})

.delete(function(req,res,next){
	Dishes.findById(req.params.dishId,function(err,dish){
		if (err) throw err;
		for(var i=dish.comments.length-1;i>0;i--){
			dish.comments.id(dish.comments[i]._id).remove();
		}
		dish.save(function(err,result){
			if (err) throw err;
			res.writeHead(200,{
				'Content-Type':'text/plain'
			});
			res.end('Deleted all comments!');
		});
	});
});







module.exports = dishRouter;
