import { created } from '../../helpers/controllers.helpers'
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
    const team = await this.teamService.create(httpRequest.body)

    return created(team)
  }

  getAll(httpRequest: HttpRequest): Promise<HttpResponse> {
    throw new Error('Method not implemented.')
  }

  update(httpRequest: HttpRequest): Promise<HttpResponse> {
    throw new Error('Method not implemented.')
  }

  delete(httpRequest: HttpRequest): Promise<HttpResponse> {
    throw new Error('Method not implemented.')
  }
}
