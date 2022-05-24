/* eslint-disable no-useless-constructor */
import User from '../../entities/user.entity'
import {
  InvalidFieldError,
  MissingParamError
} from '../../errors/controllers.errors'
import {
  badRequest,
  created,
  notFound,
  ok,
  serverError,
  unauthorized
} from '../../helpers/controllers.helpers'
import {
  HttpRequest,
  HttpResponse
} from '../../protocols/controllers.protocols'
import { ChampionshipServiceAbstract } from '../../services/championship/championship.service.types'
import { DriverStandingsServiceAbstract } from '../../services/driver-standings/driver-standings.service'
import { RaceClassificationServiceAbstract } from '../../services/race-classification/race-classification.service'
import { TeamStandingsServiceAbstract } from '../../services/team-standings/team-standings.service'
import ChampionshipControllerHelper from './championship.controller.helpers'

export interface ChampionshipControllerAbstract {
  requestEntry(httpRequest: HttpRequest): Promise<HttpResponse>
  create(httpRequest: HttpRequest): Promise<HttpResponse>
  getOne(httpRequest: HttpRequest): Promise<HttpResponse>
  getAll(httpRequest: HttpRequest): Promise<HttpResponse>
  update(httpRequest: HttpRequest): Promise<HttpResponse>
}

export class ChampionshipController implements ChampionshipControllerAbstract {
  constructor(
    private readonly championshipService: ChampionshipServiceAbstract,
    private readonly raceClassificationService: RaceClassificationServiceAbstract,
    private readonly driverStandingsService: DriverStandingsServiceAbstract,
    private readonly teamStandingsService: TeamStandingsServiceAbstract
  ) {}

  async requestEntry(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const championshipId = httpRequest.params?.id

      if (!championshipId) {
        return badRequest(new MissingParamError('championship'))
      }

      const requiredFields = ['driver']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const championship = await this.championshipService.getOne({
        id: championshipId
      })

      if (!championship) return notFound()

      const driverIsInvalid =
        championship.pendentDrivers.some(
          (i) => (i.user as User).id === httpRequest.body.driver
        ) ||
        championship.drivers.some(
          (i) => (i?.user as User)?.id === httpRequest.body.driver
        )

      if (driverIsInvalid) {
        return badRequest(new InvalidFieldError('driver'))
      }

      const result = await this.championshipService.requestEntry({
        championship: championship.id,
        pendentDrivers: championship.pendentDrivers,
        driver: httpRequest.body.driver,
        team: httpRequest.body?.team
      })

      return ok(result)
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }

  async create(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const body = JSON.parse(httpRequest.body.data)

      const errorResponse = ChampionshipControllerHelper.validateDto({
        dto: body,
        requiredFields: ['name', 'platform', 'races', 'scoringSystem']
      })

      if (errorResponse) return errorResponse

      const championship = await this.championshipService.create({
        dto: { ...body, avatarImage: httpRequest.file }
      })

      return created(championship)
    } catch (error) {
      console.error(error)
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
          'penalties'
        ]
      })

      if (errorResponse) return errorResponse

      const championshipBeingUpdated = await this.championshipService.getOne({
        id: httpRequest.params.id
      })

      if (!championshipBeingUpdated) {
        return notFound()
      }

      const userIsNotChampionshipAdmin = championshipBeingUpdated.admins.every(
        (a) => a.user !== httpRequest.user
      )

      if (userIsNotChampionshipAdmin) {
        return unauthorized()
      }

      const championship = await this.championshipService.update({
        id: httpRequest.params.id,
        dto: { ...body, avatarImage: httpRequest.file }
      })

      await this.raceClassificationService.refresh(httpRequest.params.id)
      await this.driverStandingsService.refresh(httpRequest.params.id)
      await this.teamStandingsService.refresh(httpRequest.params.id)

      return ok(championship)
    } catch (error) {
      console.error(error)
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
        id: httpRequest.params.id,
        fullPopulate: Boolean(httpRequest?.query?.full_populate)
      })

      return ok(championship)
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }

  async getAll(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.query) {
        return badRequest(new MissingParamError('query'))
      }

      const championships = await this.championshipService.getAll({
        driver: httpRequest.query.driver,
        admin: httpRequest.query.admin,
        nameOrCode: httpRequest.query.nameOrCode
      })

      return ok(championships)
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }
}
