import { Router } from 'express'

import adaptRoute from '../../adapters/express-routes.adapter'
import makeDriverStandingsController from '../../factories/driver-standings.factory'

const driverStandingsRoutes = (router: Router): void => {
  router.get(
    '/driverStandings',
    adaptRoute(makeDriverStandingsController(), 'getOne')
  )
}

export default driverStandingsRoutes
