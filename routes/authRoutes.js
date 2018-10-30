const passport = require('passport');
const keys = require('../config/keys');

module.exports = (router) => {

	router.get(
		'/auth/google',
		passport.authenticate('google', {
		scope: ['profile', 'email']
		})
	);

	router.get(
		'/auth/google/callback',
	  passport.authenticate('google', { successRedirect: '/',
                                   failureRedirect: '/login' }) 
   // passport.authenticate('google')
	);

	router.get(
		'/api/current_user',
		(req, res) => {
			console.log("RR:: ", req.user);
			res.send(req.user);
		}
	)
}