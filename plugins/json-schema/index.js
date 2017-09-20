'use strict'

const logger = require('../../lib/logger').getDefaultLogger()
const Ajv = require('ajv')
const path = require('path')
let ajv = Ajv({
  allErrors: true,
  jsonPointers: true,
  schemas: [
    require('./schema/base-type.json')
  ]
})
require('ajv-errors')(ajv)

function errorResponse (schemaErrors) {

console.log(schemaErrors)

  let errors = schemaErrors.map((error) => {
    let field = error.dataPath
    if (error.hasOwnProperty('params')) {
      if (error.params.hasOwnProperty('missingProperty')) {
        field = field || error.params.missingProperty
      } else if (error.params.hasOwnProperty('additionalProperty')) {
        field = field || error.params.additionalProperty
      }
    }
    return {
      field: field,
      message: error.message
    }
  })
  return errors
}

function bark (schema, payload) {
    // require is synchronous and no callback...
  const schemaPath = path.join(__dirname, 'schema', schema + '.json')
  const content = require(schemaPath)
  if (content) {
    try {
      let valid = ajv.validate(content, payload)
      if (!valid) {
        return errorResponse(ajv.errors)
      }
      return undefined
    }
    catch (ex) {
      logger.error('Encountering unexcpected error', ex)
      return {'message': 'Encountering unexcpected error:' + ex}
    }
  }
}

module.exports = {
  bark: bark
}
