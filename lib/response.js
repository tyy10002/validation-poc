'use strict'

const _ = require('lodash')

function getSuccessResponse (message) {
  return _.omitBy({
    'success': true,
    'status': 200,
    'message': message
  },
        _.isNil)
}

function getErrorResponse (err, status, message) {
  return _.omitBy({
    'success': false,
    'status': status | 400,
    'errors': err,
    'message': message
  },
   _.isNil)
}

function addList (response, list) {
  let data = {}
  data.items = list
  response.data = data
  return response
}

function addData (response, data) {
  response.data = data
  return response
}

module.exports = {
  getSuccessResponse: getSuccessResponse,
  getErrorResponse: getErrorResponse,
  addList: addList,
  addData: addData
}
