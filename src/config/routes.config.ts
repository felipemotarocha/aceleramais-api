import { Express, Router } from 'express'

import bonificationRouter from '../routes/bonification/bonification.routes'
import championshipRouter from '../routes/championship/championship.routes'
import driverStandingsRouter from '../routes/driver-standings/driver-standings.routes'
import penaltyRouter from '../routes/penalty/penalty.routes'
import raceRouter from '../routes/race/race.routes'
import raceClassificationRouter from '../routes/race-classification/race-classification.routes'
import teamRouter from '../routes/team/team.routes'
import teamStandingsRouter from '../routes/team-standings/team-standings.routes'
import trackRouter from '../routes/track/track.routes'
import userRouter from '../routes/user/user.routes'

const setupRoutes = (app: Express): void => {
  const router = Router()

  app.use('/api', router)

  bonificationRouter(router)
  championshipRouter(router)
  driverStandingsRouter(router)
  penaltyRouter(router)
  raceRouter(router)
  raceClassificationRouter(router)
  teamRouter(router)
  teamStandingsRouter(router)
  trackRouter(router)
  userRouter(router)
}

export default setupRoutes
