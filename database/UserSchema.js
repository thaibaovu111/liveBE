const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
  email: String,
  password: String,
  streamKey: {
    streamKey1: String,
    streamKey2: String,
    streamKey3: String,
    streamKey4: String,
    streamKey5: String,
    streamKey6: String,
    streamKey7: String,
    streamKey8: String,
    streamKey9: String,
    streamKey10: String,
    streamKey11: String,
    streamKey12: String,
    streamKey13: String,
    streamKey14: String,
    streamKey15: String,
    streamKey16: String,
    streamKey17: String,
    streamKey18: String,
    streamKey19: String,
    streamKey20: String
  },
  ResetPassword: String
})

module.exports = UserSchema
