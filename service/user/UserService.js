const passport = require('passport')
const jwt = require('jsonwebtoken')
const Password = require('../../auth/Password')

async function login (req, res, next) {
  passport.authenticate(
    'login',
    async (err, user, info) => {
      try {
        if (err || !user) {
          return res.json({
            status: 401,
            message: 'Invalidate password or user'
          })
        }

        req.login(
          user,
          { session: false },
          async (error) => {
            if (error) return next(error)

            const body = { email: user.email }
            const token = jwt.sign({ user: body }, process.env.SECRET_KEY)
            const data = {
              message: 'Successfully',
              status: 200,
              token,
              email: user.email,
              streamKey: user.streamKey
            }

            return res.json(data)
          }
        )
      } catch (error) {
        return next(error)
      }
    }
  )(req, res, next)
}

async function getcode (req, res) {
  const password = await (new Password()).getCode(req.query.email)

  if (!password) {
    return res.json('Not found email')
  }
  const data = {
    status: 200,
    message: 'Successfully',
    data: {
      code: password
    }
  }

  return res.json(data)
}

async function verifyCode (req, res) {
  const password = await (new Password()).verifyCode(req.query.code)
  if (!password) {
    return res.json('Not found code')
  }
  const data = {
    status: 200,
    message: 'Successfully',
    data: true
  }

  return res.json(data)
}

module.exports = {
  login,
  getcode,
  verifyCode
}
