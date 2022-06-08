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
import { PenaltyServiceAbstract } from '../../services/penalty/penalty.service'

export interface PenaltyControllerAbstract {
  create(httpRequest: HttpRequest): Promise<HttpResponse>
  getAll(httpRequest: HttpRequest): Promise<HttpResponse>
  update(httpRequest: HttpRequest): Promise<HttpResponse>
  delete(httpRequest: HttpRequest): Promise<HttpResponse>
}

export class PenaltyController implements PenaltyControllerAbstract {
  private readonly penaltyService: PenaltyServiceAbstract

  constructor(penaltyService: PenaltyServiceAbstract) {
    this.penaltyService = penaltyService
  }

  async create(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['championship', 'name', 'points']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const penalty = await this.penaltyService.create(httpRequest.body)

      return created(penalty)
    } catch (error) {
      console.error(error)
      Sentry.captureException(error)
      return serverError()
    }
  }

  async getAll(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.query?.championship) {
        return badRequest(new MissingParamError('championship'))
      }

      const penalties = await this.penaltyService.getAll({
        championship: httpRequest.query.championship
      })

      return ok(penalties)
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

      const penalty = await this.penaltyService.update(
        httpRequest.params.id,
        httpRequest.body
      )

      return ok(penalty)
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

      const penalty = await this.penaltyService.delete(httpRequest.params.id)

      return ok(penalty)
    } catch (error) {
      console.error(error)
      Sentry.captureException(error)
      return serverError()
    }
  }
}
