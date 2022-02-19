// Repositories
import { MongoDriverStandingsRepository } from '../repositories/driver-standings/driver-standings.repository'

// Models
import DriverStandingsModel from '../models/driver-standings.model'

// Services
import { DriverStandingsService } from '../services/driver-standings/driver-standings.service'

// Controllers
import { DriverStandingsController } from '../controllers/driver-standings/driver-standings.controller'

const makeDriverStandingsController = () => {
  const driverStandingsRepository = new MongoDriverStandingsRepository(
    DriverStandingsModel
  )

  const driverStandingsService = new DriverStandingsService(
    driverStandingsRepository
  )

  return new DriverStandingsController(driverStandingsService)
}

export default makeDriverStandingsController
