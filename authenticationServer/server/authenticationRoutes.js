module.exports = function(app,passport) {


    app.get('/noAccess',function(request, response){
        console.log("No Access");
       if(request.user == undefined)
            response.render('noAccess',{title:'Invalid Access',isAuthenticated:false});
       else
       {
            console.log(request.user);
            response.render('noAccess',{title:'Invalid Access',
                                    user:request.user,
                                    isAuthenticated:true});
       }

    });



    app.get('/login', function(req, res){
       console.log("Login Get Request"+req.user);
      res.render('login', { user: req.user, message: req.flash('error') });
    });


    app.get('/login', function(req, res){
       console.log("Login Get Request"+req.user);
      res.render('login', { user: req.user, message: req.flash('error') });
    });

    // POST /login
    //   This is an alternative implementation that uses a custom callback to
    //   acheive the same functionality.
    app.post('/login', function(req, res, next) {
      console.log("Login Post Request");
        console.log(req.body.username);
        console.log(req.body.password);
      passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err) }
        if (!user) {
          req.flash('error', info.message);
          return res.redirect('/noAccess')
        }
        req.logIn(user, function(err) {
          if (err) { return next(err); }
          return res.redirect('/user/'+user.id);
        });
      })(req, res, next);
    });

    // GET /auth/facebook
    //   Use passport.authenticate() as route middleware to authenticate the
    //   request.  The first step in Facebook authentication will involve
    //   redirecting the user to facebook.com.  After authorization, Facebook will
    //   redirect the user back to this application at /auth/facebook/callback
    app.get('/auth/facebook',
      passport.authenticate('facebook'),
      function(req, res){
        // The request will be redirected to Facebook for authentication, so this
        // function will not be called.
      });

    // GET /auth/facebook/callback
    //   Use passport.authenticate() as route middleware to authenticate the
    //   request.  If authentication fails, the user will be redirected back to the
    //   login page.  Otherwise, the primary route function function will be called,
    //   which, in this example, will redirect the user to the home page.
    app.get('/auth/facebook/callback',
      passport.authenticate('facebook', { failureRedirect: '/noAccess' }),
      function(req, res) {
        console.log("Callback:"+req.user);
        res.redirect('/user/'+req.user.id);
      });

    app.get('/logout', function(req, res){
      req.logout();
      res.redirect('/');
    });

}