var mongoose = require('mongoose'),
    User = require('../api/user/user.model'),
    FacebookStrategy = require('passport-facebook').Strategy;


module.exports = function (passport, facebookAppId, facebookAppSecret) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findOne({ _id: id }, function (err, user) {
            done(err, user);
        });
    });

    //Setup Passport
    passport.use(new FacebookStrategy({
        clientID: facebookAppId,
        clientSecret: facebookAppSecret,
        callbackURL: '/auth/facebook/callback'
    }, function(accessToken, refreshToken, profile, done) {
        User.findOne({'facebook.id': profile.id}, function (err, user) {
            if (err) { return done(err); }
            //How to get each key in profile.
            console.log(profile.displayName);
            console.log(profile.email);
            console.log(profile.username);
            console.log(profile.id);
            console.log(profile.json);
            if (!user) {
                user = new User({
                    name: profile.displayName,
                    email: profile.email,
                    user_image: profile.email,
                    username: profile.username,
                    provider_id: profile.id,
                    provider: 'facebook',
                    facebook: profile.json
                });
                user.save(function (err) {
                    if (err) {
                        console.log(err);
                    }
                    return done(err, user);
                });
            } else {
                return done(err, user);
            }
        });
    }));
};