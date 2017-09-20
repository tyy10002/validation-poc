
const rule1 = function (args, payload, callback) {
  console.log('rule1')

  // we need to send back this format
  let errors = []
  let field = {field: 'fieldName', message: 'it is the test message'}
  errors.push(field)
  callback(errors)
}

module.exports = rule1
