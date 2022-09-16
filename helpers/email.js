const User = require('../database/Schema').User
const shortid = require('shortid')
const nodemailer = require('nodemailer')

async function sendCode (req, res) {
  const transporter = nodemailer.createTransport({
    host: process.env.HOST_MAIL,
    port: process.env.PORT_MAIL,
    secure: false,
    auth: {
      user: process.env.USER_MAIL,
      pass: process.env.PASSWORD_MAIL
    }
  })

  const user = await User.findOne({ email: req.body.email }).exec()
  if (!user) {
    return req.flash('email', 'Email does not exist')
  }

  const ResetPassword = shortid.generate()
  await user.updateOne({ ResetPassword })
  const mailOptions = {
    from: process.env.USER_MAIL,
    to: req.body.email,
    subject: 'Reset your password',
    html: `code ${ResetPassword}`
  }
  const info = await transporter.sendMail(mailOptions)
  console.log('Message sent: %s', info.messageId)
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
}

module.exports = {
  sendCode
}
