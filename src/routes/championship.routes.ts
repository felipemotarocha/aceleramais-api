import { Router } from 'express'

import adaptRoute from '../adapters/express-routes.adapter'
import makeChampionshipController from '../factories/championship.factory'

const championshipRoutes = (router: Router): void => {
  router.post(
    '/championship',
    adaptRoute(makeChampionshipController(), 'create')
  )
}

export default championshipRoutes
