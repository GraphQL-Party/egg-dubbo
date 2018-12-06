
const assert = require('assert')

class DubboProvider {
  constructor (config, delegate) {
    assert(config, `[egg-dubbo] provider config must not be null or undefined!`)
    assert(delegate && typeof delegate === 'object', `[egg-dubbo] provider delegate must not be an object!`)

    const { version, group, interfaceName } = config

    assert(interfaceName, `[egg-dubbo] interfaceName must not be null or undefined!`)

    this.group = group
    this.version = version
    this.interfaceName = interfaceName
    if (!group) {
      this.group = 'HSF'
    }
    if (!version) {
      this.version = '1.0.0'
    }
    this.delegate = delegate
  }

  getConfig () {
    return {
      group: this.group,
      version: this.version,
      interfaceName: this.interfaceName
    }
  }

  getDelegate () {
    return this.delegate
  }
}

module.exports = DubboProvider
