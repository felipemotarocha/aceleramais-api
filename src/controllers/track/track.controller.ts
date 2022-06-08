import * as Sentry from '@sentry/node'

import { ServerError } from '../../errors/controllers.errors'
import { badRequest, ok } from '../../helpers/controllers.helpers'
import {
  HttpRequest,
  HttpResponse
} from '../../protocols/controllers.protocols'
import { TrackServiceAbstract } from '../../services/track/track.service'

export interface TrackControllerAbstract {
  getAll(httpRequest: HttpRequest): Promise<HttpResponse>
}

class TrackController implements TrackControllerAbstract {
  private readonly trackService: TrackServiceAbstract

  constructor(trackService: TrackServiceAbstract) {
    this.trackService = trackService
  }

  async getAll(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const tracks = await this.trackService.getAll()

      return ok(tracks)
    } catch (error) {
      console.error(error)
      Sentry.captureException(error)
      return badRequest(new ServerError())
    }
  }
}

export default TrackController
