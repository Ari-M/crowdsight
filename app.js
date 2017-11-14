require('dotenv').config();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Added lines for session, passport, and connect-flash
var session = require('express-session');
var passport = require('./config/ppConfig');
var flash = require('connect-flash');

// FOR SMS
var twilio = require('twilio');

// Mongoose stuff
var mongoose = require('mongoose');

// FOR DEVELOPMENT BELOW
 mongoose.connect('mongodb://localhost/crowdsight');

// FOR PRODUCTION BELOW
//mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });

// var index = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/auth');
var groups = require('./routes/groups');

var app = express();

// view engine setup - commented out
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.resolve(__dirname, 'client', 'build')));

/* Configure the express-session...
 * [secret]: A string used to "sign" the session ID cookie, which makes it unique
 * from application to application. We'll hide this in the environment
 * [resave]: Save the session even if it wasn't modified. We'll set this to false
 * [saveUninitialized]: If a session is new, but hasn't been changed, save it.
 * We'll set this to true.
 */
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

// Add the flash module in
app.use(flash());

app.use(function(req, res, next) {
    // before every route, attach the flash messages and current user to res.locals
    res.locals.alerts = req.flash();
    res.locals.currentUser = req.user;
    next();
});

// initialize the passport configuration and session as middleware
app.use(passport.initialize());
app.use(passport.session());

// app.use('/', index);
app.use('/users', users);
app.use('/auth', auth);
app.use('/groups', groups)

app.get('*', function(req, res, next) {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});


module.exports = app;