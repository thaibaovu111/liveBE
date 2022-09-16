const express = require('express')
const UserService = require('./UserService')
const passport = require('passport')
const router = express.Router()

router.post('/signup', passport.authenticate('signup', { session: false }), async (req, res, next) => {
  res.json({
    status: 200,
    message: 'Signup successful'
  })
})

router.post('/login', UserService.login)
// router.get('/get-code', UserService.getcode)
// router.post('/verify-code', UserService.verifyCode)

module.exports = router
