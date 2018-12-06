
const { DubboProvider } = require('egg')

module.exports = new DubboProvider({
  interfaceName: 'com.nodejs.test.TestService',
  version: '1.0.0.dev',
  group: 'HSF'
}, {
  async plus (a, b) {
    return a + b
  },
  async multi (a, b) {
    return a * b
  },
  async divide (a, b) {
    return a / b
  }
})
