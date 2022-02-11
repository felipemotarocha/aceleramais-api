import { MissingParamError } from '../../errors/controllers.errors'
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
import { BonificationServiceAbstract } from '../../services/bonification/bonification.service'

export interface BonificationControllerAbstract {
  create(httpRequest: HttpRequest): Promise<HttpResponse>
  getAll(httpRequest: HttpRequest): Promise<HttpResponse>
  update(httpRequest: HttpRequest): Promise<HttpResponse>
  delete(httpRequest: HttpRequest): Promise<HttpResponse>
}

export class BonificationController implements BonificationControllerAbstract {
  private readonly bonificationService: BonificationServiceAbstract

  constructor(bonificationService: BonificationServiceAbstract) {
    this.bonificationService = bonificationService
  }

  async create(httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ['championship', 'name', 'points']

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    const bonification = await this.bonificationService.create(httpRequest.body)

    return created(bonification)
  }

  async getAll(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.query?.championship) {
        return badRequest(new MissingParamError('championship'))
      }

      const bonifications = await this.bonificationService.getAll({
        championship: httpRequest.query.championship
      })

      return ok(bonifications)
    } catch (_e) {
      return serverError()
    }
  }

  update(httpRequest: HttpRequest): Promise<HttpResponse> {
    throw new Error('Method not implemented.')
  }

  delete(httpRequest: HttpRequest): Promise<HttpResponse> {
    throw new Error('Method not implemented.')
  }
}
