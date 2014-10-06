var uuid = require('node-uuid');

exports.loginRequired = function (req, res, next) {
	if (req.session.provider_id) {
		return next();
	}
	res.redirect('/');
};

var getAuthCookie = exports.getAuthCookie = function () {
	return uuid.v4();
}

var setCookie = exports.setCookie = function (res, val) {
	res.cookie('authtoken', val, {
		path: '/',
		expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
	});
};