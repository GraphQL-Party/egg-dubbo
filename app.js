/*
 * @Author: JimmyDaddy
 * @Date: 2018-11-02 11:29:37
 * @Last Modified by:   JimmyDaddy
 * @Description
 */
const path = require('path')
const Java = require('js-to-java')

const Provider = require('./lib/dubbo_provider_base')
const Service = require('./lib/dubbo_service_base')

module.exports = (app) => {
  const { config: { dubbo } } = app
  if (!dubbo || !dubbo.enable) {
    return
  }
  require('egg').DubboService = Service
  require('egg').Java = Java

  app.loader.loadToContext(path.join(app.config.baseDir, 'app/dubbo/service'), 'dubbo', {
    call: true,
    caseStyle: 'lower',
    fieldClass: 'dubboServiceClasses'
  })

  require('egg').DubboProvider = Provider

  const paths = app.loader.getLoadUnits().map(unit => path.join(unit.path, 'app/dubbo/provider'))
  app.loader.loadToApp(paths, 'dubboProviders', {
    call: true,
    caseStyle: 'camel'
  })

  if (Object.keys(app.dubboProviders).length) {
    app.beforeStart(async () => {
      await app.dubboServer.start()
    })
  }
}
