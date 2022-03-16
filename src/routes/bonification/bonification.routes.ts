import { Router } from 'express'

import adaptRoute from '../../adapters/express-routes.adapter'
import makeBonificationController from '../../factories/bonification.factory'

const bonificationRoutes = (router: Router): void => {
  router.get(
    '/bonification',
    adaptRoute(makeBonificationController(), 'getAll')
  )
}

export default bonificationRoutes
