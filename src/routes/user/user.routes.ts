import { Router } from 'express'

import adaptRoute from '../../adapters/express-routes.adapter'
import makeUserController from '../../factories/user.factory'

const userRoutes = (router: Router): void => {
  router.post('/user', adaptRoute(makeUserController(), 'create'))
  router.get('/user', adaptRoute(makeUserController(), 'getOne'))
  router.patch('/user/:id', adaptRoute(makeUserController(), 'update'))
}

export default userRoutes
