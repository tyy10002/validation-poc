'use strict'

function getRulesDefinition (name) {
  var jsonConfig = load(name)
  var rules = jsonConfig.map((data) => {
    return {
      name: data.name,
      args: data.args,
      validate: require(data.file)
    }
  })
  return {
    rules: rules
  }
}

function load (ruleName) {
  var jsonConfig = require('./' + ruleName + '/rules.json')
  return jsonConfig
}

module.exports = {
  getRulesDefinition: getRulesDefinition
}
