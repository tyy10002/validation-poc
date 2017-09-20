'use strict'

const express = require('express')
const Boom = require('boom')
const ruleEngine = require('../rules')
const dataResponse = require('../lib/response')
const jwtHelper = require('../lib/jwt-helper')

let jwtMiddleware = function (req, res, next) {
  jwtHelper.decodeToken(req)
  if (!req.token) {
    res.send(Boom.forbidden("You don't have permission."))
  } else {
    next()
  }
}

let barkController = express.Router()
barkController.use(jwtMiddleware)
barkController.route('/validate')
    .post(function (req, res, next) {
      const metadata = req.body.metadata
      const payload = req.body.payload
      if (metadata && payload) {
        ruleEngine.execute(metadata.strategy, payload, function (err, result) {
          if (err && err && err.length > 0) {
            const badResponse = dataResponse.getErrorResponse(err, 400, err.message || 'Validation Error')
            res.send(badResponse)
          } else {
            res.send({status: '200'})
          }
        })
      } else {
        res.send(Boom.badRequest('Invalid Request'))
      }
    })

module.exports = barkController
