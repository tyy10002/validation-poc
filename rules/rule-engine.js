'use strict'

const _ = require('lodash')
const logger = require('../lib/logger').getDefaultLogger()

function execute (rulesList, payload, callback) {
  let promises = []
  if (rulesList) {
    rulesList.rules.forEach(function (rule) {
      let p = new Promise((resolve, reject) => {
        rule['validate'](rule.args, payload, function (err) {
          resolve(err)
        })
      })
      promises.push(p)
    })
  }
  Promise.all(promises).then(values => {
    callback(mergeErrors(values))
  }, reason => {
    let err = {field: 'unknown', message: reason}
    logger.error('reason', reason)
    callback(err)
  })
}

function mergeErrors (allErrors) {
  let compactErrors = _.compact(allErrors)
  let errorList = []
  compactErrors.forEach(function (err) {
    errorList = _.concat(errorList, err)
  })
  return errorList
}

// expose just the funtions
module.exports = {
  execute: execute
}
