
'use strict'

const assert = require('assert')
const { ZookeeperRegistry } = require('sofa-rpc-node').registry
const Java = require('js-to-java')

const DubboClient = require('../../lib/client')
const DubboServer = require('../../lib/server')
const DubboProvider = require('../../lib/dubbo_provider_base')

const DUBBOREGISTRY = Symbol('Application#Dubbo#Registry')
const DUBBOCLIENT = Symbol('Application#Dubbo#Client')
const DUBBOSERVER = Symbol('Application#Dubbo#Server')

module.exports = {
  get dubbo () {
    return {
      DubboProvider
    }
  },

  get Java () {
    return Java
  },

  get dubboRegistry () {
    const dubboConfig = this.config.dubbo

    if (!dubboConfig || !dubboConfig.enable) {
      return null
    }

    if (!this[DUBBOREGISTRY]) {
      const config = dubboConfig.registry
      assert(config.address, '[egg-dubbo:registry]  address of registry config must not be null')
      let { address } = config
      // make sure to set the right address
      if ((!this.config.dubbo.protocol || this.config.dubbo.protocol === 'dubbo') && config.address.indexOf('/dubbo') < 0) {
        address = address + '/dubbo/'
      }
      this[DUBBOREGISTRY] = new ZookeeperRegistry({
        logger: this.logger,
        ...config,
        address
      })
      this[DUBBOREGISTRY].on('error', err => {
        this.logger.error(err)
      })
      this.beforeClose(async () => {
        await this[DUBBOREGISTRY].close()
      })
    }
    return this[DUBBOREGISTRY]
  },

  get dubboClient () {
    const dubboConfig = this.config.dubbo
    if (!dubboConfig || !dubboConfig.enable) {
      return null
    }
    if (!this[DUBBOCLIENT]) {
      this[DUBBOCLIENT] = new DubboClient(this)
    }
    return this[DUBBOCLIENT]
  },

  get dubboServer () {
    const dubboConfig = this.config.dubbo

    if (!dubboConfig || !dubboConfig.enable) {
      return null
    }

    if (!this[DUBBOSERVER]) {
      this[DUBBOSERVER] = new DubboServer(this)
    }
    return this[DUBBOSERVER]
  }
}
