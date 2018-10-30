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
	);
}