/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app, passport) {

  // Insert routes below
  app.use('/api/things', require('./api/thing'));

  //Secured API
  //ここでクエリを使ってアクセスさせるべきかorクッキーの仕組みを使うか
  app.get('/api/secured/*', function (req, res, next) {
    // console.log(req.user.toString());
    if (!req.session || !req.session.provider_id) {
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
  app.get('/auth/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/auth/failure' }), function(req, res) {
      req.session.provider_id = req.user.provider_id;
      res.render('after-auth', { state: 'success', user: req.user ? req.user : null });
    }
  );
  app.get('/auth/failure', function(req, res) {
    res.render('after-auth', { state: 'failure', user: null });
  });

  app.delete('/auth', function(req, res) {
    req.logout();
    req.session.destroy();
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
