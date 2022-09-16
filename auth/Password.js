
const bcrypt = require('bcrypt')
const shortid = require('shortid')
const User = require('../database/Schema').User
const saltRounds = 10

class Password {
  constructor (password) {
    this.password = password
  }

  comparePassword (hash) {
    return bcrypt.compareSync(this.password, hash)
  }

  generateHash () {
    const salt = bcrypt.genSaltSync(saltRounds)
    return bcrypt.hashSync(this.password, salt)
  }

  generateStreamKey () {
    return shortid.generate()
  }

  async getCode (email) {
    const user = await User.findOne({ email })
    if (!user) {
      return ''
    }

    const ResetPassword = shortid.generate()
    user.ResetPassword = ResetPassword
    await user.save()

    return ResetPassword
  }

  async verifyCode (code) {
    const user = await User.findOne({ code })
    if (!user) {
      return false
    }

    return true
  }

  async register (email, done) {
    const password = this.generateHash()
    const streamKey1 = this.generateStreamKey()
    const streamKey2 = this.generateStreamKey()
    const streamKey3 = this.generateStreamKey()
    const streamKey4 = this.generateStreamKey()
    const streamKey5 = this.generateStreamKey()
    const streamKey6 = this.generateStreamKey()
    const streamKey7 = this.generateStreamKey()
    const streamKey8 = this.generateStreamKey()
    const streamKey9 = this.generateStreamKey()
    const streamKey10 = this.generateStreamKey()
    const streamKey11 = this.generateStreamKey()
    const streamKey12 = this.generateStreamKey()
    const streamKey13 = this.generateStreamKey()
    const streamKey14 = this.generateStreamKey()
    const streamKey15 = this.generateStreamKey()
    const streamKey16 = this.generateStreamKey()
    const streamKey17 = this.generateStreamKey()
    const streamKey18 = this.generateStreamKey()
    const streamKey19 = this.generateStreamKey()
    const streamKey20 = this.generateStreamKey()
    try {
      const validate = await User.findOne({ email })
      if (validate) {
        return done(null, false, { message: 'User already taken' })
      } else {
        const data = {
          email,
          password,
          streamKey: {
            streamKey1,
            streamKey2,
            streamKey3,
            streamKey4,
            streamKey5,
            streamKey6,
            streamKey7,
            streamKey8,
            streamKey9,
            streamKey10,
            streamKey11,
            streamKey12,
            streamKey13,
            streamKey14,
            streamKey15,
            streamKey16,
            streamKey17,
            streamKey18,
            streamKey19,
            streamKey20
          }
        }
        return await User.create(data)
      }
    } catch (error) {
      return done(error)
    }
  }

  async login (email) {
    return await User.findOne({ email })
  }

  async changeStreamKey (email) {
    const user = await User.findOne({ email })
    if (!user) {
      return ''
    }

    const streamKey = this.generateStreamKey()
    user.changeStreamKey = streamKey
    await user.save()

    return streamKey
  }
}

module.exports = Password
