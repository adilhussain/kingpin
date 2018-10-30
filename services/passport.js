const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.use(
	new GoogleStrategy(
	{
		clientID: keys.googleClientID,
		clientSecret: keys.googleClientSecret,
		callbackURL: '/auth/google/callback'
	}, function(accessToken, refreshToken, profile, done){
		  console.log("Got Access Token:: ", accessToken);
	    console.log("Got Refresh Token:: ", refreshToken);
	    console.log("Got Profilee:: ", profile);

      User.findOne({ googleId: profile.id })
        .then( (existingUser) => {
          if(existingUser){
            console.log("User already present::", existingUser);
            // we already have a record with given profile Id
          } else {
            console.log("User not present:: Creating one");
            x = new User({ googleId: profile.id, userName: profile.displayName, googleToken: accessToken }).save();
            console.log("Mongo returns after creation:: ", x);
          }
        })
	})
);