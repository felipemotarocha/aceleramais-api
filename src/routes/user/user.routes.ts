import { Router } from 'express'
import multer from 'multer'

import adaptRoute from '../../adapters/express-routes.adapter'
import makeUserController from '../../factories/user.factory'

const storage = multer.memoryStorage()
const upload = multer({ storage })

const userRoutes = (router: Router): void => {
  router.post(
    '/user',
    upload.single('profileImage'),
    adaptRoute(makeUserController(), 'create')
  )
  router.get('/user', adaptRoute(makeUserController(), 'getOne'))
  router.get('/user/all', adaptRoute(makeUserController(), 'getAll'))
  router.patch(
    '/user/:id',
    upload.single('profileImage'),
    adaptRoute(makeUserController(), 'update')
  )
}

export default userRoutes
