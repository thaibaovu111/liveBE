const CronJob = require('cron').CronJob
const request = require('request')
const helpers = require('../helpers/helpers')
const config = require('../config/default')
const port = config.rtmp_server.http.port

const job = new CronJob('*/5 * * * * *', function () {
  request
    .get('http://127.0.0.1:' + port + '/api/streams', function (error, response, body) {
      const streams = JSON.parse(body)
      if (typeof (streams.live !== undefined)) {
        const liveStreams = streams.live
        for (const stream in liveStreams) {
          if (!liveStreams.hasOwnProperty(stream)) continue
          helpers.generateStreamThumbnail(stream)
        }
      }
    })
}, null, true)

module.exports = job
