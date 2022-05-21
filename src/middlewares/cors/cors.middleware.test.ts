import request from 'supertest'
import app from '../../config/app.config'

describe('CORS Middleware', () => {
  it('should enable CORS', async () => {
    app.get('/test_cors', (_req, res) => {
      res.send()
    })

    await request(app)
      .get('/test_cors')
      .set('Authorization', 'valid_token')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-headers', '*')
      .expect('access-control-allow-methods', '*')
  })
})
