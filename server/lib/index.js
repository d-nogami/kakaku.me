exports.loginRequired = function(req, res, next) {
	if (req.session.id) {
		return next();
	}
	res.redirect('/');
};