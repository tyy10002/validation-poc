'use strict'

const path = require('path')
const winston = require('winston')
const winstonDailyRotateFile = require('winston-daily-rotate-file')  // eslint-disable-line
const config = require('config')
const serviceConfig = config.get('service')

function getDefaultLogger () {
  let logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({
        timestamp: function () {
          return Date.now()
        },
        level: serviceConfig.loglevel
      }),
      new (winston.transports.DailyRotateFile)({
        timestamp: function () {
          return Date.now()
        },
        name: 'file',
        datePattern: '.yyyy-MM-dd',
        filename: path.join(__dirname, serviceConfig.logLocaction, 'service.log'),
        level: serviceConfig.loglevel
      })
    ]
  })
  return logger
}

module.exports = {
  getDefaultLogger: getDefaultLogger
}
