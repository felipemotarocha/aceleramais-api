import * as Sentry from '@sentry/node'

import { MissingParamError } from '../../errors/controllers.errors'
import { badRequest, ok, serverError } from '../../helpers/controllers.helpers'
import {
  HttpRequest,
  HttpResponse
} from '../../protocols/controllers.protocols'
import { TeamStandingsServiceAbstract } from '../../services/team-standings/team-standings.service'

export interface TeamStandingsControllerAbstract {
  getOne(httpRequest: HttpRequest): Promise<HttpResponse>
}

export class TeamStandingsController
implements TeamStandingsControllerAbstract {
  private readonly teamStandingsService: TeamStandingsServiceAbstract

  constructor(teamStandingsService: TeamStandingsServiceAbstract) {
    this.teamStandingsService = teamStandingsService
  }

  async getOne(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.query) {
        return badRequest(new MissingParamError('query'))
      }

      if (!httpRequest.query?.championship) {
        return badRequest(new MissingParamError('championship'))
      }

      const scoringSystem = await this.teamStandingsService.getOne({
        championship: httpRequest.query.championship
      })

      return ok(scoringSystem)
    } catch (error) {
      console.error(error)
      Sentry.captureException(error)
      return serverError()
    }
  }
}
