const 	mongoose = require('mongoose'),
		Comment = require('./comments.js')
		bcrypt = require('bcrypt');



//define what a user looks like in the database
const userSchema = new mongoose.Schema({
	name: String,
	email: 	{
				type:String,
				require:true,
				unique: true
			},
	password: 	{
					type:String,
					require:true
				},
	items:[ String ],
	zipcode: {type: Number, require:true},
	comments: [ Comment.schema ]
})

//make a function that checks whether the password is correct

userSchema.methods.isAuthenticated = function(password){
	//carrying over their entered password vs the hashed 'password' stored in their database object
	//compare(typedInPassword, actualPasswordInDatabase)
	let isCorrectPassword = bcrypt.compareSync(password, this.password);
	return isCorrectPassword ? this : false;
}


//hash the password before saving a user to the database

userSchema.pre('save', function(next){
//if the user being updated?
//if yes, they already have a password, which has already been hashed
//so..no action required
	if(!this.isModified('password')){
		next();
	} else {
		this.password = bcrypt.hashSync(this.password, 10)
		next();		
	}		
});

//mongoose.model(nameOfDBCollection)
//Arguments after mongoose.model(________)
//1. name: will lowercase and pluralize for DB
//2. schema: what does a user look like
//3. forceName: (optional) force the name to something other
//than what #1 generates as a collection name

module.exports = mongoose.model('User', userSchema);


//OR you could have used module.exports = User if...you do this>>>
//const User = mongoose.model('User', "userSchema")