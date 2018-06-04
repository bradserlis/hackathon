const 	express = require('express'),
		passport = require('../config/passportConfig'),
		// profileRoute = require('./profile'),
		authRoute = express.Router();

const User = require('../models/user');

//render the page with the login form
authRoute.get('/login', function(req, res){
	res.render('auth/login')
});

//handle log in functionality

authRoute.post('/login', passport.authenticate('local', {
	successRedirect: '/profile',
	successFlash: 'logged in successfully',
	failureRedirect: '/auth/login',
	failureFlash: 'Invalid credentials'
}));

//render the page with the signup form
authRoute.get('/signup', function(req, res){
	res.render('auth/signup')
});

//signup functionality
authRoute.post('/signup', function(req, res, next){
	
	console.log('info from form', req.body);
	//first, try to find their email (in case it already exists)
	User.findOne({email:req.body.email}, function(err, user){
		if(err){
			console.log('bummer', err);
			req.flash('error', 'something went wrong');
			res.redirect('/auth/signup')
		} else if(user){
			//don't want to let them sign up multiple times with same email
			req.flash('error', 'Login already exists');
			res.redirect('/auth/login');
		} else{
			//user did everything right - they are actually a new user signing up
			User.create(req.body, function(err, createdUser){
				if(err){
					req.flash('error', 'nooo why');
					return console.log('err', err);
				}
				console.log('Success! Signed up now');
				passport.authenticate('local', 
				{
					successRedirect: '/profile/search',
					successFlash: 'Successful account creation'
				})
				(req, res, next);
			});
		}
	});
});


//logout route removes user data from session
//then it redirects them to the home page
authRoute.get('/logout', function(req, res){
	req.logout();
	req.flash('success', 'you are logged out. byeeeeeeee');
	res.redirect('/');
});


module.exports = authRoute;