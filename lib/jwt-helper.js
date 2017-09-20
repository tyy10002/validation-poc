'use strict'

const jwt = require('jsonwebtoken')
const logger = require('./logger').getDefaultLogger()

function decodeToken (req) {
  let decoded
  try {
    let authHeader = req.get('authorization')
    if (authHeader) {
      let token
      if (authHeader.length > 'Bearer '.length) {
        let matches = authHeader.split(' ')
        token = matches.length === 2 ? matches[1] : undefined
      }
      // We dont need to verify the token as it is done by Jwt plugin already.
      decoded = jwt.decode(token)
    } else {
      // try query string
      let token = req.query['token']
      if (token) {
        decoded = jwt.decode(token)
      }
    }
  } catch (err) {
    logger.error(err)
  }
  req.token = decoded
}

module.exports = {
  decodeToken: decodeToken
}
