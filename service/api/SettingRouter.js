const { Router } = require('express')
const express = require('express')
const router = express.Router()
const SettingRouter = require('./SettingService')

router.get('/', SettingRouter.getStreamKey)
router.post('/', SettingRouter.changeSetting)

module.exports = router
