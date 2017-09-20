var assert = require('chai').assert

describe('sample module', function () {
  it('should add numbers', function () {
    assert.equal((1 + 1), '2')
    assert.strictEqual(127 + 319, 446)
  })
})
