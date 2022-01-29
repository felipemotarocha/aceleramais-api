import express from 'express'

import setupMiddlewares from './middlewares.config'
import setupRoutes from './routes.config'

const app = express()

setupMiddlewares(app)

setupRoutes(app)

export default app
