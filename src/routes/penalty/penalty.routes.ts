import { Router } from 'express'

import adaptRoute from '../../adapters/express-routes.adapter'
import makePenaltyController from '../../factories/penalty.factory'

const penaltyRoutes = (router: Router): void => {
  router.get('/penalty', adaptRoute(makePenaltyController(), 'getAll'))
}

export default penaltyRoutes
