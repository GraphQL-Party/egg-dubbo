'use strict'

const { Java, DubboService } = require('egg')

module.exports = (app) => {
  class TestService extends DubboService {
    constructor () {
      super(app, {
        interfaceName: 'com.nodejs.test.TestService',
        version: '1.0.0.dev',
        methods: [
          {
            methodName: 'plus',
            parameters: {
              'a': Java.Integer,
              'b': Java.Integer
            },
            responseTimeout: 4000
          },
          {
            methodName: 'multi',
            parameters: {
              'a': Java.Integer,
              'b': Java.Integer
            },
            responseTimeout: 4000
          }
        ]
      })
    }

    async divide (a, b) {
      const result = await this.invoke('divide', [a, b])
      return result
    }
  }
  return TestService
}
