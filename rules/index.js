'use strict'

const logger = require('../lib/logger').getDefaultLogger()
const loader = require('./loader')
const ruleEngine = require('./rule-engine')

function execute (ruleName, payload, callback) {
  logger.debug('executing rule:' + ruleName)
  // 1) load rule by name
  const rules = loader.getRulesDefinition(ruleName)

  // 2) execute each validator of a rule
  ruleEngine.execute(rules, payload, callback)
}

module.exports = {
  execute: execute
}
