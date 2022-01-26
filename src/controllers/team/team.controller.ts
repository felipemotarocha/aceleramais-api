import {
  MissingParamError,
  NotAllowedFieldsError
} from '../../errors/controllers.errors'
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
      return serverError()
    }
  }

  async getAll(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.query) {
        return badRequest(new MissingParamError('query'))
      }

      if (!httpRequest.query?.championship) {
        return badRequest(new MissingParamError('championship'))
      }

      const teams = await this.teamService.getAll({
        championship: httpRequest!.query!.championship
      })

      return ok(teams)
    } catch (_) {
      return serverError()
    }
  }

  async update(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.params) {
        return badRequest(new MissingParamError('params'))
      }

      if (!httpRequest.params?.id) {
        return badRequest(new MissingParamError('id'))
      }

      const allowedUpdates = ['name', 'color']

      const someReceivedUpdateIsNotAllowed = Object.keys(httpRequest.body).some(
        (update) => !allowedUpdates.includes(update)
      )

      if (someReceivedUpdateIsNotAllowed) {
        return badRequest(new NotAllowedFieldsError())
      }

      const race = await this.teamService.update(
        httpRequest.params.id,
        httpRequest.body
      )

      return ok(race)
    } catch (_) {
      return serverError()
    }
  }

  async delete(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.params) {
        return badRequest(new MissingParamError('params'))
      }

      if (!httpRequest.params?.id) {
        return badRequest(new MissingParamError('id'))
      }

      const team = await this.teamService.delete(httpRequest.params.id)

      return ok(team)
    } catch (_) {
      return serverError()
    }
  }
}
