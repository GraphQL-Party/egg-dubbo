
'use strict'

// const assert = require('assert')
const { RpcServer } = require('sofa-rpc-node').server
const protocol = require('dubbo-remoting')

class DubboServer extends RpcServer {
  constructor (app) {
    const config = app.config.dubbo && app.config.dubbo.server
    const registry = app.dubboRegistry
    super({
      appName: app.name,
      // 如果是 selfPublish 单独创建 registry 连接来发布服务
      registry,
      protocol,
      logger: app.logger,
      ...config
    })
    app.ready((err) => {
      if (!err) {
        this.load()
        this.publish()
        this.logger.info('[egg-dubboc#server] publish all rpc services after app ready')
      }
    })
    this.app = app
    this.config = config
  }

  /**
   * @description load all exist service
   * @author JimmyDaddy
   * @memberof DubboServer
   */
  load () {
    for (const key in this.app.dubboProviders) {
      const service = this.app.dubboProviders[key]
      this.addService({
        ...this.config,
        ...service.getConfig()
      }, service.getDelegate())
    }
  }
}

module.exports = DubboServer
