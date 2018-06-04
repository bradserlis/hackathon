const 	mongoose = require('mongoose'),
		express = require('express'),
		passport = require('../config/passportConfig'),
		isLoggedIn = require('../middleware/isLoggedIn'),
		showRoute = express.Router(),
		Comment = require('../models/comments'),
		User = require('../models/user');

showRoute.get('/:id', isLoggedIn, function(req, res){
	User.findById(req.params.id, function(err, thisUser){
	res.render('show', {thisUser: thisUser, currentUser: res.locals.currentUser})
	})
})

showRoute.post('/:id', function(req, res){
	console.log('made it to the backend')

	//find user to add comment to: 
	User.findById(req.params.id, (err, target)=>{
		//create a new comment, assign it the form data as content
		Comment.create(req.body, (err, commentData)=>{
		if(err){
			console.log(err)
		}
		//push this new comment into that user's comments array
		target.comments.push(commentData);
	//save the user now
		target.save();
		});
	});
	res.send("success message")
})


module.exports = showRoute;