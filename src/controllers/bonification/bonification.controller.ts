import * as Sentry from '@sentry/node'

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
    } catch (error) {
      console.error(error)
      Sentry.captureException(error)
      return serverError()
    }
  }

  async update(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.params?.id) {
        return badRequest(new MissingParamError('id'))
      }

      const allowedUpdates = ['name', 'points']

      const someReceivedUpdateIsNotAllowed = Object.keys(httpRequest.body).some(
        (update) => !allowedUpdates.includes(update)
      )

      if (someReceivedUpdateIsNotAllowed) {
        return badRequest(new NotAllowedFieldsError())
      }

      const bonification = await this.bonificationService.update(
        httpRequest.params.id,
        httpRequest.body
      )

      return ok(bonification)
    } catch (error) {
      console.error(error)
      Sentry.captureException(error)
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

      const bonification = await this.bonificationService.delete(
        httpRequest.params.id
      )

      return ok(bonification)
    } catch (error) {
      console.error(error)
      Sentry.captureException(error)
      return serverError()
    }
  }
}
