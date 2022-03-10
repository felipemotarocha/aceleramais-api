import { Router } from 'express'

import adaptRoute from '../../adapters/express-routes.adapter'
import { makeTeamStandingsController } from '../../factories/team-standings.factory'

const teamStandingsRoutes = (router: Router): void => {
  router.get(
    '/teamStandings',
    adaptRoute(makeTeamStandingsController(), 'getOne')
  )
}

export default teamStandingsRoutes
