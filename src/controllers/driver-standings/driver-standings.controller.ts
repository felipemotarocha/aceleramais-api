import { MissingParamError } from '../../errors/controllers.errors'
import { badRequest, ok, serverError } from '../../helpers/controllers.helpers'
import {
  HttpRequest,
  HttpResponse
} from '../../protocols/controllers.protocols'
import { DriverStandingsServiceAbstract } from '../../services/driver-standings/driver-standings.service'

export interface DriverStandingsControllerAbstract {
  getOne(httpRequest: HttpRequest): Promise<HttpResponse>
}

export class DriverStandingsController
implements DriverStandingsControllerAbstract {
  private readonly driverStandingsService: DriverStandingsServiceAbstract

  constructor(driverStandingsService: DriverStandingsServiceAbstract) {
    this.driverStandingsService = driverStandingsService
  }

  async getOne(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.query) {
        return badRequest(new MissingParamError('query'))
      }

      if (!httpRequest.query?.championship) {
        return badRequest(new MissingParamError('championship'))
      }

      const scoringSystem = await this.driverStandingsService.getOne({
        championship: httpRequest.query.championship
      })

      return ok(scoringSystem)
    } catch (_) {
      return serverError()
    }
  }
}
