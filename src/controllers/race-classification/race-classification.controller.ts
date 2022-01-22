import { ServerError } from '../../errors/controllers.errors'
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
      const race = await this.raceClassificationService.getOne(
        httpRequest.query!.race!
      )

      return ok(race)
    } catch (_e) {
      return badRequest(new ServerError())
    }
  }

  async update(httpRequest: HttpRequest): Promise<HttpResponse> {
    const raceClassification = await this.raceClassificationService.update(
      httpRequest.query!.id,
      httpRequest.body
    )

    return ok(raceClassification)
  }
}

export default RaceClassificationController
