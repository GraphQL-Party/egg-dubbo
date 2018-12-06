'use strict'

const Controller = require('egg').Controller

module.exports = (app) => {
  class HomeController extends Controller {
    /**
     * @description 测试连接 java 后端提供的服务
     * @author JimmyDaddy
     * @memberof HomeController
     */
    async dubboJava () {
      const result = await this.ctx.dubbo.userBaseQuery.getUserInfo({
        userInfoQueryDO: {
          userName: 'John'
        }
      })
      this.ctx.body = result
    }

    /**
     * @description 测试连接自己提供的服务
     * @author JimmyDaddy
     * @memberof HomeController
     */
    async dubbo () {
      const pr = await this.ctx.dubbo.test.plus({
        a: 1,
        b: 4
      })

      const mr = await this.ctx.dubbo.test.multi({
        a: 2,
        b: 4
      })

      const dr = await this.ctx.dubbo.test.divide(1, 2)

      this.ctx.body = pr + mr + dr
    }
  }
  return HomeController
}
