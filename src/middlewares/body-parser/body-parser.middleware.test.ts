import request from 'supertest'
import app from '../../config/app.config'

describe('Body Parser Middleware', () => {
  it('should parse body as json', async () => {
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body)
    })

    await request(app)
      .post('/test_body_parser')
      .set('authorization', 'Bearer valid_token')
      .send({ name: 'Felipe' })
      .expect({ name: 'Felipe' })
  })
})
