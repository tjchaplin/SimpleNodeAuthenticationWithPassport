module.exports = function(app,passport) {
    var authenticationRoutes =  require('./authenticationRoutes')(app,passport);

    app.get('/',function(request, response){
        console.log("Root path");
       if(request.user == undefined)
            response.render('index',{title:'A Sample Dust Title',isAuthenticated:false});
       else
       {
            console.log(request.user);
            response.render('index',{title:'A Sample Dust Title',
                                    user:request.user,
                                    isAuthenticated:true});
       }

    });


    app.get('/user/:userId',function(request, response){
        console.log("Root User:"+request.params.userId);
        ensureAuthenticated(request,response,function(){
            console.log(request.user);
            response.render('user',{title:'User Main Page',
                                    user:request.user,
                                    isAuthenticated:true});
        });

    });

    // Simple route middleware to ensure user is authenticated.
    //   Use this route middleware on any resource that needs to be protected.  If
    //   the request is authenticated (typically via a persistent login session),
    //   the request will proceed.  Otherwise, the user will be redirected to the
    //   login page.
    function ensureAuthenticated(req, res, next) {
      if (req.isAuthenticated()) { return next(); }
      res.redirect('/noAccess')
    }
    // Simple route middleware to ensure user is authenticated.
    //   Use this route middleware on any resource that needs to be protected.  If
    //   the request is authenticated (typically via a persistent login session),
    //   the request will proceed.  Otherwise, the user will be redirected to the
    //   login page.
    function ensureAuthenticatedApi(req, res, next) {
      if (req.isAuthenticated()) { return next(); }
      console.log("Invalid user Sending 402");
      //Not authenticated
      res.writeHead(402);
      res.end();
    }

}