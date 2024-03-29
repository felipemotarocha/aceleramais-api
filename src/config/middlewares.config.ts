import { Express } from 'express'

import bodyParser from '../middlewares/body-parser/body-parser.middleware'
import cors from '../middlewares/cors/cors.middleware'
import contentType from '../middlewares/content-type/content-type.middleware'
import auth from '../middlewares/auth/auth.middleware'

const setupMiddlewares = (app: Express): void => {
  app.use(bodyParser)
  app.use(cors)
  app.use(contentType)
  app.use(auth)
}

export default setupMiddlewares
