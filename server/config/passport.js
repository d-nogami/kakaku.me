var mongoose = require('mongoose'),
    User = require('../api/user/user.model'),
    FacebookStrategy = require('passport-facebook').Strategy;


module.exports = function (passport, facebookAppId, facebookAppSecret) {

    passport.serializeUser(function(user, done) {
        console.log('serialize:' + user);
        done(null, user.id);
    });

    //ここは何してるのか
    passport.deserializeUser(function(id, done) {
        User.findOne({ _id: id }, function (err, user) {
            console.log('deserialize:' + err);
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
            console.log(JSON.stringify(profile));

            if (!user) {
                user = new User({
                    name: profile.displayName,
                    profile_url: profile.profileUrl,
                    username: profile.displayName,
                    provider_id: profile.id,
                    provider: 'facebook',
                    facebook: profile._json
                });
                user.save(function (err) {
                    if (err) {
                        console.log(err);
                    }
                    console.log(err);
                    return done(err, user);
                });
            } else {
                console.log(JSON.stringify(user));
                return done(err, user);
            }
        });
    }));
};