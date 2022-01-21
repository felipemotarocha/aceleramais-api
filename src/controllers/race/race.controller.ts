import {
  MissingParamError,
  NotAllowedFieldsError,
  ServerError
} from '../../errors/controllers.errors'
import { badRequest, created, ok } from '../../helpers/controllers.helpers'
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

    const requiredFields = [
      'trackId',
      'championship',
      'classification',
      'startDate'
    ]

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    return created(race)
  }

  async getOne(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest?.params?.id) {
      return badRequest(new MissingParamError('id'))
    }

    const race = await this.raceService.getOne(httpRequest.params.id)

    return ok(race)
  }

  async getAll(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest?.query) {
      return badRequest(new ServerError())
    }

    const race = await this.raceService.getAll(httpRequest.query!)

    return ok(race)
  }

  async update(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest?.params?.id) {
      return badRequest(new MissingParamError('id'))
    }

    const allowedUpdates = ['trackId', 'startDate']

    const someReceivedUpdateIsNotAllowed = Object.keys(httpRequest.body).some(
      (update) => !allowedUpdates.includes(update)
    )

    if (someReceivedUpdateIsNotAllowed) {
      return badRequest(new NotAllowedFieldsError())
    }

    const race = await this.raceService.update(
      httpRequest.params.id,
      httpRequest.body
    )

    return ok(race)
  }
}

export default RaceController