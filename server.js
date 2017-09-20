'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const config = require('config')
const barkController = require('./bark/controller')
const logger = require('./lib/logger').getDefaultLogger()

const serviceConfig = config.get('service')
const port = serviceConfig.port || 6001

const app = express()
app.use(helmet())
app.use(bodyParser.json())

// default
app.get('/', function (req, res) {
  res.send('S1 Validation Service')
})

app.use('/api/v1', barkController)
app.listen(port, function () {
  logger.info('Service listening on port ', port)
})

process.on('uncaughtException', function (ex) {
  logger.error('Encountering unexcpected error', ex)
})
