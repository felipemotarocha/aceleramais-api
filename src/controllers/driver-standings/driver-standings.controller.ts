import { MissingParamError } from '../../errors/controllers.errors'
import { badRequest, created } from '../../helpers/controllers.helpers'
import {
  HttpRequest,
  HttpResponse
} from '../../protocols/controllers.protocols'
import { DriverStandingsServiceAbstract } from '../../services/driver-standings/driver-standings.service'

export interface DriverStandingsControllerAbstract {
  create(httpRequest: HttpRequest): Promise<HttpResponse>
  update(httpRequest: HttpRequest): Promise<HttpResponse>
  getOne(httpRequest: HttpRequest): Promise<HttpResponse>
}

export class DriverStandingsController
implements DriverStandingsControllerAbstract {
  private readonly driverStandingsService: DriverStandingsServiceAbstract

  constructor(driverStandingsService: DriverStandingsServiceAbstract) {
    this.driverStandingsService = driverStandingsService
  }

  async create(httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ['championship', 'standings']

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    const someUserIsInvalid = httpRequest.body.standings.some(
      (item) => !item.user && item.isRegistered
    )

    if (someUserIsInvalid) {
      return badRequest(
        new Error('Some user provided on the standings is invalid.')
      )
    }

    const driverStandings = await this.driverStandingsService.create(
      httpRequest.body
    )

    return created(driverStandings)
  }

  update(httpRequest: HttpRequest): Promise<HttpResponse> {
    throw new Error('Method not implemented.')
  }

  getOne(httpRequest: HttpRequest): Promise<HttpResponse> {
    throw new Error('Method not implemented.')
  }
}
