import { MissingParamError } from '../../errors/controllers.errors'
import { badRequest, created } from '../../helpers/controllers.helpers'
import {
  HttpRequest,
  HttpResponse
} from '../../protocols/controllers.protocols'
import { ScoringSystemServiceAbstract } from '../../services/scoring-system/scoring-system.service'

export interface ScoringSystemControllerAbstract {
  create(httpRequest: HttpRequest): Promise<HttpResponse>
  getAll(httpRequest: HttpRequest): Promise<HttpResponse>
  update(httpRequest: HttpRequest): Promise<HttpResponse>
  delete(httpRequest: HttpRequest): Promise<HttpResponse>
}

export class ScoringSystemController
implements ScoringSystemControllerAbstract {
  private readonly scoringSystemService: ScoringSystemServiceAbstract

  constructor(scoringSystemService: ScoringSystemServiceAbstract) {
    this.scoringSystemService = scoringSystemService
  }

  async create(httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ['championship', 'scoringSystem']

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    const scoringSystem = await this.scoringSystemService.create(
      httpRequest.body
    )

    return created(scoringSystem)
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
