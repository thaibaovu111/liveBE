const Setting = require('../../database/Schema').Setting
const User = require('../../database/Schema').User

async function getStreamKey (req, res) {
  const email = req.user.email
  const setting = await Setting.findOne({ email })

  if (!setting) {
    const data = {
      status: 200,
      message: 'Could not found email'
    }

    return res.json(data)
  }

  const data = {
    status: 200,
    message: 'Successfully',
    data: {
      setting
    }
  }

  return res.json(data)
}

async function changeSetting (req, res) {
  const email = req.user.email
  const user = await User.findOne({ email })

  if (!user) {
    const data = {
      status: 200,
      message: 'Could not found email'
    }

    return res.json(data)
  }

  const query = { email }

  const insert = {
    Domain: req.body.Domain,
    PortAPI: req.body.PortAPI,
    NameLive: req.body.NameLive,
    PortLive: req.body.PortLive,
    TypeVideo: req.body.TypeVideo,
    MainKeyStream: req.body.MainKeyStream,
    ExtraKeyStream1: req.body.ExtraKeyStream1,
    ExtraKeyStream2: req.body.ExtraKeyStream2,
    email
  }

  Setting.findOneAndUpdate(query, insert, { upsert: true }, (err, setting) => {
    if (err) return res.send(500, { error: err })
    const data = {
      status: 200,
      message: 'Successfully',
      setting
    }

    return res.json(data)
  })
}

module.exports = {
  getStreamKey,
  changeSetting
}
