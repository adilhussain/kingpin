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

      User.findOne({ googleId: profile.id })
        .then( (existingUser) => {
          if(existingUser){
            console.log("User already present::", existingUser);
            // we already have a record with given profile Id
          } else {
            console.log("User not present:: Creating one");
            const uuid = uuidv1();
            console.log("Generated UUID::", uuid);
            new User({ googleId: profile.id, userName: profile.displayName, googleToken: accessToken, uuid: uuid}).save()
              .then((x) => {
                console.log("returned value:: ", x);
              });
          }
        })
	})
);