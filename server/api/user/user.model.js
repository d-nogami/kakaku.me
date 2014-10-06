'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    lib = require('../../lib');


var UserSchema = new Schema({
  name: { type: String, required: true },
  profile_url: String,
  username: String,
  provider_id: { type: String, required: true, unique: true },
  provider: String,
  facebook: {},
  authcookie: { type: String, required: true, default: lib.getAuthCookie },
  created: { type: Date, 'default': Date.now }
});

module.exports = mongoose.model('User', UserSchema);