const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');
const uuidv1 = require('uuid/v1'); //based on timestamp

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
      let user;
      User.findOne({ googleId: profile.id })
        .then( (existingUser) => {
          if(existingUser){
            user = existingUser;
            console.log("User already present::", existingUser);
            // we already have a record with given profile Id
            // return done(existingUser);
          } else {
            console.log("User not present:: Creating one");
            const uuid = uuidv1();
            console.log("Generated UUID::", uuid);
            new User({ googleId: profile.id, userName: profile.displayName, googleToken: accessToken, uuid: uuid}).save()
              .then((new_user) => {
                console.log("NEW USER:: ", new_user);
                user = new_user;
              });
          }
        })
      return done(null, user);
  	})
);