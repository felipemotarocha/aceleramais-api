import { created } from '../../helpers/controllers.helpers'
import {
  HttpRequest,
  HttpResponse
} from '../../protocols/controllers.protocols'
import { RaceServiceAbstract } from '../../services/race/race.service'

export interface RaceControllerAbstract {
  create(httpRequest: HttpRequest): Promise<HttpResponse>
  getOne(httpRequest: HttpRequest): Promise<HttpResponse>
  getAll(httpRequest: HttpRequest): Promise<HttpResponse>
  update(httpRequest: HttpRequest): Promise<HttpResponse>
}

class RaceController implements RaceControllerAbstract {
  private readonly raceService: RaceServiceAbstract

  constructor(raceService: RaceServiceAbstract) {
    this.raceService = raceService
  }

  async create(httpRequest: HttpRequest): Promise<HttpResponse> {
    const race = await this.raceService.create(httpRequest.body)

    return created(race)
  }

  getOne(httpRequest: HttpRequest): Promise<HttpResponse> {
    throw new Error('Method not implemented.')
  }

  getAll(httpRequest: HttpRequest): Promise<HttpResponse> {
    throw new Error('Method not implemented.')
  }

  update(httpRequest: HttpRequest): Promise<HttpResponse> {
    throw new Error('Method not implemented.')
  }
}

export default RaceController
