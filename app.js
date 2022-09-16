const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const bodyParse = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const Session = require('express-session')
const FileStore = require('session-file-store')(Session)
const app = express()
require('dotenv').config()
require('./auth/auth')
const cors = require('cors')
app.use(cors({
  origin: '*'
}))

mongoose.connect(`mongodb://${process.env.DB_HOST_PRODUCT}:${process.env.DB_PORT}/${process.env.DB_NAME}`, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))

const routes = require('./service/user/UserRouter')
const settingRoute = require('./service/api/SettingRouter')

// view engine setup
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(require('cookie-parser')())
app.use(bodyParse.urlencoded({ extended: true }))
app.use(bodyParse.json({ extended: true }))
app.use(Session({
  store: new FileStore({
    path: './server/sessions'
  }),
  secret: process.env.SECRET_KEY,
  maxAge: Date().now + (60 * 1000 * 30)
}))
app.use('/api', routes)
// Plug in the JWT strategy as a middleware so only verified users can access this route.
app.use('/api/settings', passport.authenticate('jwt', { session: false }), settingRoute)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500)
  res.send('Not found 404')
})

module.exports = app
