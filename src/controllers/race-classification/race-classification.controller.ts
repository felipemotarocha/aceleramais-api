import {
  MissingParamError,
  NotAllowedFieldsError,
  ServerError
} from '../../errors/controllers.errors'
import { badRequest, ok } from '../../helpers/controllers.helpers'
import {
  HttpRequest,
  HttpResponse
} from '../../protocols/controllers.protocols'
import { RaceClassificationServiceAbstract } from '../../services/race-classification/race-classification.service'

export interface RaceClassificationControllerAbstract {
  getOne(httpRequest: HttpRequest): Promise<HttpResponse>
  update(httpRequest: HttpRequest): Promise<HttpResponse>
}

class RaceClassificationController
implements RaceClassificationControllerAbstract {
  private readonly raceClassificationService: RaceClassificationServiceAbstract

  constructor(raceClassificationService: RaceClassificationServiceAbstract) {
    this.raceClassificationService = raceClassificationService
  }

  async getOne(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.query?.race) {
        return badRequest(new MissingParamError('race'))
      }

      const race = await this.raceClassificationService.getOne(
        httpRequest.query!.race!
      )

      return ok(race)
    } catch (_e) {
      return badRequest(new ServerError())
    }
  }

  async update(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.query?.race) {
        return badRequest(new MissingParamError('race'))
      }

      const allowedUpdates = ['classification']

      const someReceivedUpdateIsNotAllowed = Object.keys(httpRequest.body).some(
        (update) => !allowedUpdates.includes(update)
      )

      if (someReceivedUpdateIsNotAllowed) {
        return badRequest(new NotAllowedFieldsError())
      }

      const someUserIsInvalid = httpRequest.body.classification.some(
        (item) =>
          (!item.user && item.isRegistered) ||
          (item.user && item.userName) ||
          (item.user && !item.isRegistered) ||
          (item.userName && item.isRegistered)
      )

      if (someUserIsInvalid) {
        return badRequest(
          new Error('Some user provided on the classification is invalid.')
        )
      }

      const raceClassification = await this.raceClassificationService.update(
        httpRequest.query!.id,
        httpRequest.body
      )

      return ok(raceClassification)
    } catch (_) {
      return badRequest(new ServerError())
    }
  }
}

export default RaceClassificationController
