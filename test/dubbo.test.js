'use strict'

/* eslint-disable */
const mock = require('egg-mock')

describe('test/dubbo.test.js', () => {
  let app
  before(() => {
    app = mock.app({
      baseDir: 'example',
      framework: false
    })
    return app.ready()
  })

  after(() => {
    app.close()
  })

  afterEach(mock.restore)

  it('should GET /dubbo', () => {
    return app.httpRequest()
      .get('/dubbo')
      .expect('13.5')
      .expect(200)
  })
})
