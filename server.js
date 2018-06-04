//modules I require to run this app
require('dotenv').config(); //loads the .env file
const 		 express = require('express'),
			 app = express(),
			 bodyParser = require('body-parser'),
			 mongoose = require('mongoose'),
			 expressLayouts = require('express-ejs-layouts'),
			 flash = require('connect-flash'),
			 authRoute = require('./controllers/auth'),
			 profileRoute = require('./controllers/profile'),
			 showRoute = require('./controllers/show'),
			 passport = require('./config/passportConfig'),
			 session = require('express-session'),
			 isLoggedIn = require('./middleware/isLoggedIn'),
			 Comment = require('./models/comments'),
			 User = require('./models/user'),
			 port = process.env.PORT || 3000;


//connect to DB

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/hackathon');

//set and use statements

app.set('view engine', 'ejs');
// app.set('views', '/')
app.use(expressLayouts);
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.static(__dirname + '/public'));

//makes life easier....

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.alerts = req.flash();
	next();
});

//top-level routes

app.get('/', function(req, res){
	res.render('home');
});



//include routes from any controllers/routes

app.use('/auth', authRoute);
app.use('/profile', profileRoute);
app.use('/show', showRoute);


//listen

app.listen(port);