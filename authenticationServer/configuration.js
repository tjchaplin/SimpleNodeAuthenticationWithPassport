
module.exports = function(app,express,flash,passport,LocalStrategy,FacebookStrategy) {

    var passportConfiguration = require('./passportConfiguration')(passport);
    var localAuthentication = require('./localAuthentication')(passport,LocalStrategy);
    var facebookAuthentication = require('./facebookAuthentication')(passport,FacebookStrategy);


    app.configure(function(){
        app.set('view engine', 'dust');
        app.set('views', app.root + '/authenticationServer/views');
        app.use(express.bodyParser());
        app.use(express.cookieParser());
        app.use(express.session({ secret: 'secret',
            cookie: { maxAge: 1800000 }}));
        app.use(flash());
        app.use(passport.initialize());
        app.use(passport.session());
        app.use(app.router);

        app.use(express.methodOverride());
        app.use(express.static(app.root + '/authenticationServer/server'));
        app.use(express.static(app.root + '/authenticationServer/public', {redirect: false}));
     });

}
