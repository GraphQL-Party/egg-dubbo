# egg-dubbo

egg dubbo 插件, 宋小菜前端团队出品，仅作 NodeParty 会议交流使用

## 使用

* clone 本仓库
* 安装 zookeeper 并启动
* 运行测试`npm run test`，如要连接后端 `java` 服务请根据您的实际情况修改测试代码
* 拷贝到 egg 项目下 `lib/plugin`
* 增加如下配置到 `app/config/plugins.js`

```javascript
exports.dubbo = {
  enable: true,
  path: path.join(__dirname, '../lib/plugin/egg-dubbo')
}
```

* 使用请[参考此处](./test/fixtures/example)

## egg config

```javascript
// app/config/config.js
exports.dubbo = {
  enable: true,
  registry: {
    address: '127.0.0.1:2181' // 注册中心地址
  },
  client: {
    group: 'DFG' // 设置默认 group
  },
  server: {
    port: 7002
  }
}
```

## 关于插件的调用方式

* 插件向外暴露出基础类 `DubboService` 以及 `DubboProvider`，继承/实例以上两者达到提供服务和调用服务的目的。
* 或参考 [egg loadController 源码](https://github.com/eggjs/egg-core/blob/master/lib/loader/mixin/controller.js) 以及 [egg loadService 源码](https://github.com/eggjs/egg-core/blob/master/lib/loader/mixin/service.js) 实现配置化加载