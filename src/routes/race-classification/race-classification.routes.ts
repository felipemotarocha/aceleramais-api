import { Router } from 'express'

import adaptRoute from '../../adapters/express-routes.adapter'
import makeRaceClassificationController from '../../factories/race-classification.factory'

const raceClassificationRoutes = (router: Router): void => {
  router.get(
    '/raceClassification',
    adaptRoute(makeRaceClassificationController(), 'getOne')
  )
}

export default raceClassificationRoutes
