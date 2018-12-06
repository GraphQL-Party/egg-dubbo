
const assert = require('assert')
const Java = require('js-to-java')
const ISREADY = Symbol('Application#Dubbo#Service#ConsumerReady')

class DubboServiceBase {
  constructor (app, options) {
    this.app = app
    assert(options, '[egg-dubbo] service options must not be null or undefined')
    const { interfaceName, version, serverHost, responseTimeout = 3000, methods } = options
    assert(interfaceName, '[egg-dubbo] service interfaceName must not be null or undefined')
    assert(version, '[egg-dubbo] service version must not be null or undefined')
    assert(methods && methods.length > 0, '[egg-dubbo] service version must not be null or undefined')

    this.responseTimeout = responseTimeout
    this.consumer = app.dubboClient.createConsumer({
      interfaceName,
      version,
      serverHost
    })

    methods.map((v) => {
      Object.defineProperty(this, v.methodName, {
        value: async function (params) {
          let { responseTimeout = this.responseTimeout } = v
          const requestParams = []
          if (v.parameters) {
            for (const key in params) {
              if (params.hasOwnProperty(key)) {
                const value = params[key]
                if (typeof v.parameters[key] === 'string') {
                  requestParams.push(Java(v.parameters[key], value))
                } else if (typeof v.parameters[key] === 'function') {
                  requestParams.push(v.parameters[key](value))
                } else {
                  app.logger.error('[egg-dubbo] set invalid paramter type for method %s', v.methodName)
                  return null
                }
              }
            }
          } else if (params && !v.parameters) {
            app.logger.info('[egg-dubbo] this method %s do not need any parameter', v.methodName)
          }
          const result = await this.consumer.invoke(v.methodName, requestParams, {
            responseTimeout
          })
          return result
        },
        writable: false
      })
    })

    this[ISREADY] = false

    this.ready()
    this.options = options
  }

  async ready () {
    await this.consumer.ready()
    this[ISREADY] = true
  }

  /**
   * @description invoke method
   * @author JimmyDaddy
   * @param {*} method
   * @param {*} params
   * @param {*} options
   * @returns
   * @memberof DubboServiceBase
   */
  async invoke (method, params, options) {
    if (!this[ISREADY]) {
      await this.ready()
    }
    return this.consumer.invoke(method, params, options)
  }
}

module.exports = DubboServiceBase
