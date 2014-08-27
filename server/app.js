/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var config = require('./config/environment');
var appkey = require('./config/appkey');


// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

// Populate DB with sample data
if(config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();

app.use(cookieParser());
app.use(session({
	secret: appkey.COOKIE,
	cookie: { httpOnly: false }
}));
app.use(function (req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.set('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Accept,Authorization');
    res.set('Access-Control-Allow-Credentials', 'true');
    next();
});


var server = require('http').createServer(app);
var passport = require('passport');


require('./config/passport')(passport, appkey.APP_ID, appkey.APP_SECRET);
require('./config/express')(app, passport);

require('./routes')(app, passport);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;