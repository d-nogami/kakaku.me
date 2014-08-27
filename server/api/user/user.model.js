'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    uuid = require('node-uuid');

function getAuthCookie() {
	return uuid.v4();
}

var UserSchema = new Schema({
  name: { type: String, required: true },
  profile_url: String,
  username: String,
  provider_id: { type: String, required: true, unique: true },
  provider: String,
  facebook: {},
  authcookie: { type: String, required: true, default: getAuthCookie },
  created: { type: Date, 'default': Date.now }
});

module.exports = mongoose.model('User', UserSchema);