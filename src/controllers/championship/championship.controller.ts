/* eslint-disable no-useless-constructor */
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
import { ChampionshipServiceAbstract } from '../../services/championship/championship.service'
import { DriverStandingsServiceAbstract } from '../../services/driver-standings/driver-standings.service'
import { TeamStandingsServiceAbstract } from '../../services/team-standings/team-standings.service'
import ChampionshipControllerHelper from './championship.controller.helpers'

export interface ChampionshipControllerAbstract {
  create(httpRequest: HttpRequest): Promise<HttpResponse>
  getOne(httpRequest: HttpRequest): Promise<HttpResponse>
  getAll(httpRequest: HttpRequest): Promise<HttpResponse>
  update(httpRequest: HttpRequest): Promise<HttpResponse>
}

export class ChampionshipController implements ChampionshipControllerAbstract {
  constructor(
    private readonly championshipService: ChampionshipServiceAbstract,
    private readonly driverStandingsService: DriverStandingsServiceAbstract,
    private readonly teamStandingsService: TeamStandingsServiceAbstract
  ) {}

  async create(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const body = JSON.parse(httpRequest.body.data)

      const errorResponse = ChampionshipControllerHelper.validateDto({
        dto: body,
        requiredFields: ['name', 'platform', 'races', 'scoringSystem']
      })

      if (errorResponse) return errorResponse

      const championship = await this.championshipService.create({
        createChampionshipDto: { ...body, avatarImage: httpRequest.file }
      })

      return created(championship)
    } catch (error) {
      return serverError()
    }
  }

  async update(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.params?.id) {
        return badRequest(new MissingParamError('id'))
      }

      const body = JSON.parse(httpRequest.body.data)

      const errorResponse = ChampionshipControllerHelper.validateDto({
        dto: body,
        requiredFields: [
          'scoringSystem',
          'drivers',
          'teams',
          'bonifications',
          'penalties',
          'races'
        ]
      })

      if (errorResponse) return errorResponse

      const championship = await this.championshipService.update(
        httpRequest.params.id,
        { ...body, avatarImage: httpRequest.file }
      )

      await this.driverStandingsService.refresh(httpRequest.params.id)
      await this.teamStandingsService.refresh(httpRequest.params.id)

      return ok(championship)
    } catch (error) {
      console.log({ error })
      return serverError()
    }
  }

  async getOne(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.params) {
        return badRequest(new MissingParamError('params'))
      }

      if (!httpRequest.params?.id) {
        return badRequest(new MissingParamError('id'))
      }

      const championship = await this.championshipService.getOne({
        id: httpRequest.params.id
      })

      return ok(championship)
    } catch (_) {
      return serverError()
    }
  }

  async getAll(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.query?.driver) {
        return badRequest(new MissingParamError('driver'))
      }

      const championships = await this.championshipService.getAll({
        driver: httpRequest.query.driver
      })

      return ok(championships)
    } catch (_) {
      return serverError()
    }
  }
}
