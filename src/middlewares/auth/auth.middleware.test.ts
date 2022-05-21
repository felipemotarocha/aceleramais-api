import request from 'supertest'
import app from '../../config/app.config'

describe('Auth Middleware', () => {
  it('should return 401 if no token is provided', async () => {
    app.post('/test_auth', (req, res) => {
      res.send(req.body)
    })

    await request(app).post('/test_auth').expect(401)
  })

  it('should return 200 if a valid token is provided', async () => {
    app.post('/test_auth', (req, res) => {
      res.send(req.body)
    })

    await request(app)
      .post('/test_auth')
      .set('authorization', 'Bearer valid_token')
      .send({ name: 'Felipe' })
      .expect(200)
  })

  it('should return 200 if a invalid token is provided', async () => {
    app.post('/test_auth', (req, res) => {
      res.send(req.body)
    })

    await request(app)
      .post('/test_auth')
      .set('authorization', 'Bearer invalid_token')
      .send({ name: 'Felipe' })
      .expect(200)
  })
})
