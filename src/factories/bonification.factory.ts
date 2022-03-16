import { BonificationController } from '../controllers/bonification/bonification.controller'
import BonificationModel from '../models/bonification.model'
import { MongoBonificationRepository } from '../repositories/bonification/bonification.repository'
import { BonificationService } from '../services/bonification/bonification.service'

const makeBonificationController = () => {
  const bonificationRepository = new MongoBonificationRepository(
    BonificationModel
  )

  const bonificationService = new BonificationService(bonificationRepository)

  return new BonificationController(bonificationService)
}

export default makeBonificationController
