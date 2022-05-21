import express from 'express'

import './firebase-admin.config'
import './firebase.config'

import setupMiddlewares from './middlewares.config'
import setupRoutes from './routes.config'

const app = express()

setupMiddlewares(app)

setupRoutes(app)

export default app
