'use strict'

const { DubboService } = require('egg')
// const { Java } = require('egg')

module.exports = (app) => {
  /**
   * @description 连接后端 java 微服务，测试时视后端情况而定
   * @author JimmyDaddy
   * @class UserBaseQuery
   * @extends {DubboService}
   */
  class UserBaseQuery extends DubboService {
    constructor () {
      super(app, {
        interfaceName: 'com.nodejs.test.provider.UserProvider',
        version: '1.0.0.dev',
        methods: [
          {
            methodName: 'getUserInfo',
            parameters: {
              userInfoQueryDO: 'com.nodejs.test.param.UserInfoQueryDO'
            },
            responseTimeout: 3000
          }
        ]
      })
    }
  }
  return UserBaseQuery
}
