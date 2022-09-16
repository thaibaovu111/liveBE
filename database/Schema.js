const mongoose = require('mongoose')

exports.User = mongoose.model('User', require('./UserSchema'))
exports.Setting = mongoose.model('Setting', require('./SettingSchema'))
