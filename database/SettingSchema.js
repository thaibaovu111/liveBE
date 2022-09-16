const mongoose = require('mongoose')

const Schema = mongoose.Schema

const SettingSchema = new Schema({
  Domain: String,
  PortAPI: String,
  NameLive: String,
  PortLive: String,
  TypeVideo: String,
  MainKeyStream: String,
  ExtraKeyStream1: String,
  ExtraKeyStream2: String,
  email: String
})

module.exports = SettingSchema
