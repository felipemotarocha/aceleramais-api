import { Router } from 'express'

import adaptRoute from '../../adapters/express-routes.adapter'
import makeTeamController from '../../factories/team.factory'

const teamRoutes = (router: Router): void => {
  router.get('/team', adaptRoute(makeTeamController(), 'getAll'))
}

export default teamRoutes
