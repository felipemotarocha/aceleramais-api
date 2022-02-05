import { Router } from 'express'

import adaptRoute from '../../adapters/express-routes.adapter'
import makeTrackController from '../../factories/track.factory'

const trackRoutes = (router: Router): void => {
  router.get('/track', adaptRoute(makeTrackController(), 'getAll'))
}

export default trackRoutes
