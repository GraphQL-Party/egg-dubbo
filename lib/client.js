
'use strict'

const assert = require('assert')
const { RpcClient } = require('sofa-rpc-node').client
const protocol = require('dubbo-remoting')

class DubboClient extends RpcClient {
  constructor (app) {
    const config = app.config.dubbo && app.config.dubbo.client
    super({
      logger: app.logger,
      registry: app.dubboRegistry,
      protocol,
      ...config
    })
    this.app = app
    this.config = config
  }

  createConsumer (options, consumerClass) {
    const targetAppName = options.appName || this.app.config.name
    assert(targetAppName, '[egg-dubbo:client] createConsumer(options, consumerClass) options must config appName')
    options = {
      ...this.config,
      responseTimeout: 30000, // default timeout
      ...options
    }
    return super.createConsumer(options, consumerClass)
  }
}

module.exports = DubboClient
