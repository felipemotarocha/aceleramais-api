import { PenaltyController } from '../controllers/penalty/penalty.controller'
import PenaltyModel from '../models/penalty.model'
import { MongoPenaltyRepository } from '../repositories/penalty/penalty.repository'
import { PenaltyService } from '../services/penalty/penalty.service'

const makePenaltyController = () => {
  const penaltyRepository = new MongoPenaltyRepository(PenaltyModel)

  const penaltyService = new PenaltyService(penaltyRepository)

  return new PenaltyController(penaltyService)
}

export default makePenaltyController
