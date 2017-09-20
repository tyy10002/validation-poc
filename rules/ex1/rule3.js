
'use strict'

const jsonSchemaValidator = require('../../plugins/json-schema')

const rule3 = function (args, payload, callback) {
  console.log('rule3')
  var error = jsonSchemaValidator.bark(args.schema, payload)
  callback(error)
}

module.exports = rule3
