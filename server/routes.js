/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app, passport) {

  // Insert routes below
  app.use('/api/things', require('./api/thing'));

  //Secured API
  app.get('/api/secured/*', function (req, res, next) {
    if (!req.user) {
      return res.json({ error: 'This is a secret message, login to see it.' });
    }
    next();
  }, function (req, res) {
    res.json({ message: 'This message is only for authenticated users' });
  });

  app.get('/api/*', function (req, res) {
    res.json({ message: 'This message is known by all' });
  });

  // Authentication
  app.get('/auth/facebook', passport.authenticate('facebook'));
  app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/auth/success', failureRedirect: '/auth/failure' }));
  app.get('/auth/success', function(req, res) {
    res.render('after-auth', { state: 'success', user: req.user ? req.user : null });
  });
  app.get('/auth/failure', function(req, res) {
    res.render('after-auth', { state: 'failure', user: null });
  });

  app.delete('/auth', function(req, res) {
    req.logout();
    res.writeHead(200);
    res.end();
  });
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
