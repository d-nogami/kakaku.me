'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  rofile_url: String,
  username: String,
  provider_id: String,
  provider: String,
  facebook: {},
  created: { type: Date, 'default': Date.now }
});

module.exports = mongoose.model('User', UserSchema);