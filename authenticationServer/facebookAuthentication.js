module.exports = function(passport,FacebookStrategy) {
    var userRepository = require('./userRepository');

    var FACEBOOK_APP_ID = "1"
    var FACEBOOK_APP_SECRET = "1";

    // Use the FacebookStrategy within Passport.
    //   Strategies in Passport require a `verify` function, which accept
    //   credentials (in this case, an accessToken, refreshToken, and Facebook
    //   profile), and invoke a callback with a user object.
    passport.use(new FacebookStrategy({
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        callbackURL: "/auth/facebook/callback"
      },
      function(accessToken, refreshToken, profile, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {

          // To keep the example simple, the user's Facebook profile is returned to
          // represent the logged-in user.  In a typical application, you would want
          // to associate the Facebook account with a user record in your database,
          // and return that user instead.
          //return done(null, profile);
          console.log("verification for:"+profile.displayName+" id:"+profile.id);
          // authenticated `user`.
          userRepository.findByFacebookId(profile.id, function(err, user) {

            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: 'Unknown user ' + profile.displayName });
             }
            return done(null, {id:user.id,name:user.name,email:user.email});
          })

        });
      }
    ));

}