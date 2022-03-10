import { Router } from 'express'

import adaptRoute from '../../adapters/express-routes.adapter'
import { makeRaceController } from '../../factories/race.factory'

const raceRoutes = (router: Router): void => {
  router.get('/race', adaptRoute(makeRaceController(), 'getAll'))

  router.get('/race/:id', adaptRoute(makeRaceController(), 'getOne'))
}

export default raceRoutes
