module.exports = app => {
  const { router, controller } = app
  router.get('/dubbo', controller.home.dubbo)
  router.post('/dubbo', controller.home.dubbo)
}
