import { Router } from 'express'
import multer from 'multer'

import adaptRoute from '../../adapters/express-routes.adapter'
import makeChampionshipController from '../../factories/championship.factory'

const storage = multer.memoryStorage()
const upload = multer({ storage })

const championshipRoutes = (router: Router): void => {
  router.post(
    '/championship',
    upload.single('avatarImage'),
    adaptRoute(makeChampionshipController(), 'create')
  )

  router.post(
    '/championship/:id/requestEntry',

    adaptRoute(makeChampionshipController(), 'requestEntry' as any)
  )

  router.put(
    '/championship/:id',
    upload.single('avatarImage'),
    adaptRoute(makeChampionshipController(), 'update')
  )

  router.get(
    '/championship',
    adaptRoute(makeChampionshipController(), 'getAll')
  )

  router.get(
    '/championship/:id',
    adaptRoute(makeChampionshipController(), 'getOne')
  )
}

export default championshipRoutes
