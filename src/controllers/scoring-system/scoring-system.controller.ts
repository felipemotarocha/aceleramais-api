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
import { ScoringSystemServiceAbstract } from '../../services/scoring-system/scoring-system.service'

export interface ScoringSystemControllerAbstract {
  create(httpRequest: HttpRequest): Promise<HttpResponse>
  getOne(httpRequest: HttpRequest): Promise<HttpResponse>
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
    try {
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
    } catch (_) {
      return serverError()
    }
  }

  async getOne(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.query) {
        return badRequest(new MissingParamError('query'))
      }

      if (!httpRequest.query?.championship) {
        return badRequest(new MissingParamError('championship'))
      }

      const scoringSystem = await this.scoringSystemService.getOne({
        championship: httpRequest!.query!.championship
      })

      return ok(scoringSystem)
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

      const allowedUpdates = ['scoringSystem']

      const someReceivedUpdateIsNotAllowed = Object.keys(httpRequest.body).some(
        (update) => !allowedUpdates.includes(update)
      )

      if (someReceivedUpdateIsNotAllowed) {
        return badRequest(new NotAllowedFieldsError())
      }

      const scoringSystem = await this.scoringSystemService.update(
        httpRequest.params.id,
        httpRequest.body
      )

      return ok(scoringSystem)
    } catch (_) {
      return serverError()
    }
  }

  delete(httpRequest: HttpRequest): Promise<HttpResponse> {
    throw new Error('Method not implemented.')
  }
}
