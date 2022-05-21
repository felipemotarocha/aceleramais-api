import request from 'supertest'

import app from '../../config/app.config'

describe('Content Type Middleware', () => {
  it('should return default content type as json', async () => {
    app.get('/test_content_type', (_req, res) => {
      res.send('')
    })

    await request(app)
      .get('/test_content_type')
      .set('authorization', 'Bearer valid_token')
      .expect('content-type', /json/)
  })

  it('should return xml content type when forced', async () => {
    app.get('/test_content_type_xml', (_req, res) => {
      res.type('xml')
      res.send('')
    })

    await request(app)
      .get('/test_content_type_xml')
      .set('authorization', 'Bearer valid_token')
      .expect('content-type', /xml/)
  })
})
