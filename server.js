var express = require('express')
    , routes = require('routes')
    , http = require('http')
    , fs = require('fs')
    , path = require('path')
    , cons = require('consolidate')
    , dustln = require('dustjs-linkedin')
    , flash = require('connect-flash')
    , passport = require('passport')
    , util = require('util')
    , LocalStrategy = require('passport-local').Strategy
    , FacebookStrategy = require('passport-facebook').Strategy
    , ObjectID = require('mongodb').ObjectID;


var app = express();

// assign the dust engine to .dust files
app.engine('dust', cons.dust);

app.root = __dirname;
global.host = 'localhost';

require('./authenticationServer/configuration')(app,express,flash,passport,LocalStrategy,FacebookStrategy);
require('./authenticationServer/server/router')(app,passport);

app.listen(3000, function(){
        console.log("Express server listening on port 3000");
});
