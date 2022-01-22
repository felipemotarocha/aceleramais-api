import { ok } from '../../helpers/controllers.helpers'
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
    const race = await this.raceClassificationService.getOne(
      httpRequest.query!.race!
    )

    return ok(race)
  }

  update(httpRequest: HttpRequest): Promise<HttpResponse> {
    throw new Error('Method not implemented.')
  }
}

export default RaceClassificationController
