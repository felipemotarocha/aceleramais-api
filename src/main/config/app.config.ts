import express from 'express'

import setupMiddlewares from './middlewares.config'

const app = express()

setupMiddlewares(app)

export default app
