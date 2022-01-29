import request from 'supertest'

import app from '../../config/app'

describe('CORS Middleware', () => {
  it('should enable CORS', async () => {
    app.get('/test_corsr', (_req, res) => {
      res.send()
    })

    await request(app)
      .get('/test_corsr')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-headers', '*')
      .expect('access-control-allow-methods', '*')
  })
})
