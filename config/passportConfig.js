const 	passport = require('passport'),
		LocalStrategy = require('passport-local').Strategy,
		User = require('../models/user');

// tell passport how to store data in session


//serializing and deserializing so we don't have to store entire user 
//object in session

passport.serializeUser(function(user, callback){
	//callback(if error , if success )
	//if an error, pass it, otherwise, null/false/falsey value for no error
	callback(null, user.id);
});

passport.deserializeUser(function(id, callback){
	User.findById(id).then(function(user){
		//success
		callback(null, user);
		// .catch is catching exceptions, so this only kicks in if something
		//goes wrong
	}).catch(function(err){
		//if something went wrong - 
		callback(err, null);
	})
})

//actually implement login functionality

//NOTE: callback function called when function is all done
passport.use(new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password'
	//1,find the user
	//2,validate credentials
	//3, done! so...callback>>>
}, function(email, password, callback){
	User.findOne({email:email}, function(err, user){
		if(err || !user || !user.isAuthenticated(password)){
			console.log('error', err);
			callback(err, null);
		} else {
			callback(null, user);
		}
	});
}));

module.exports = passport;
