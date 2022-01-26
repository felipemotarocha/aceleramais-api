import { MissingParamError, ServerError } from '../../errors/controllers.errors'
import {
  badRequest,
  created,
  ok,
  serverError
} from '../../helpers/controllers.helpers'
import {
  HttpRequest,
  HttpResponse
} from '../../protocols/controllers.protocols'
import { TeamServiceAbstract } from '../../services/team/team.service'

export interface TeamControllerAbstract {
  create(httpRequest: HttpRequest): Promise<HttpResponse>
  getAll(httpRequest: HttpRequest): Promise<HttpResponse>
  update(httpRequest: HttpRequest): Promise<HttpResponse>
  delete(httpRequest: HttpRequest): Promise<HttpResponse>
}

export class TeamController implements TeamControllerAbstract {
  private readonly teamService: TeamServiceAbstract

  constructor(teamService: TeamServiceAbstract) {
    this.teamService = teamService
  }

  async create(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'championship']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const team = await this.teamService.create(httpRequest.body)

      return created(team)
    } catch (_) {
      return serverError(new ServerError())
    }
  }

  async getAll(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest?.query?.championship) {
        return badRequest(new MissingParamError('championship'))
      }

      const teams = await this.teamService.getAll({
        championship: httpRequest!.query!.championship
      })

      return ok(teams)
    } catch (_) {
      return serverError(new ServerError())
    }
  }

  update(httpRequest: HttpRequest): Promise<HttpResponse> {
    throw new Error('Method not implemented.')
  }

  delete(httpRequest: HttpRequest): Promise<HttpResponse> {
    throw new Error('Method not implemented.')
  }
}
