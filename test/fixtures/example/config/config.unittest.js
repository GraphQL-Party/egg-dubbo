'use strict'

exports.keys = '123456'

exports.logger = {
  level: 'DEBUG'
}

exports.dubbo = {
  enable: true,
  registry: {
    address: '218.244.135.116:2181'
  },
  client: {
    group: 'HSF'
  },
  server: {
    port: 7002
  }
}
