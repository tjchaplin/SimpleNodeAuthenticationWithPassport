module.exports = function(passport,LocalStrategy) {
    var userRepository = require('./userRepository');

    // Use the LocalStrategy within Passport.
    //   Strategies in passport require a `verify` function, which accept
    //   credentials (in this case, a username and password), and invoke a callback
    //   with a user object.  In the real world, this would query a database;
    //   however, in this example we are using a baked-in set of users.
    passport.use(new LocalStrategy(
      function(username, password, done) {
        console.log("Authenticating:"+username+" password:"+password);
        // asynchronous verification, for effect...
        process.nextTick(function () {

          // Find the user by username.  If there is no user with the given
          // username, or the password is not correct, set the user to `false` to
          // indicate failure and set a flash message.  Otherwise, return the
          // authenticated `user`.
          userRepository.findByUsername(username, function(err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: 'Unknown user ' + username });
             }
            if (user.password != password) {
                return done(null, false, { message: 'Invalid password' });
            }

            return done(null, {id:user.id,name:user.name,email:user.email});
          })
        });
      }
    ));

}