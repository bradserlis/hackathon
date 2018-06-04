

module.exports = function(req, res, next){
	if(!req.user){
		req.flash('error', 'you are not authorized to view this page. Please login.');
		res.redirect('/auth/login');
	}
	else {
		next();
	}
}


// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     } res.redirect("/login");
// }