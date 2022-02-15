import {
  InvalidFieldError,
  MissingParamError
} from '../../errors/controllers.errors'
import {
  badRequest,
  created,
  ok,
  serverError
} from '../../helpers/controllers.helpers'
import DriverHelpers from '../../helpers/driver.helpers'
import {
  HttpRequest,
  HttpResponse
} from '../../protocols/controllers.protocols'
import { ChampionshipServiceAbstract } from '../../services/championship/championship.service'

export interface ChampionshipControllerAbstract {
  create(httpRequest: HttpRequest): Promise<HttpResponse>
  getOne(httpRequest: HttpRequest): Promise<HttpResponse>
  getAll(httpRequest: HttpRequest): Promise<HttpResponse>
}

export class ChampionshipController implements ChampionshipControllerAbstract {
  private readonly championshipService: ChampionshipServiceAbstract

  constructor(championshipService: ChampionshipServiceAbstract) {
    this.championshipService = championshipService
  }

  async create(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const body = JSON.parse(httpRequest.body.data)

      const requiredFields = [
        'name',
        'description',
        'platform',
        'races',
        'scoringSystem'
      ]

      for (const field of requiredFields) {
        if (!body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const someRaceIsInvalid = body.races.some(
        (race) => !race.track || !race.startDate
      )

      if (someRaceIsInvalid) {
        return badRequest(new InvalidFieldError('races'))
      }

      const someScoringSystemIsInvalid = Object.keys(body.scoringSystem).some(
        (key) => {
          return (
            ![...Array(50).keys()].includes(parseInt(key)) ||
            typeof body.scoringSystem[key] !== 'number'
          )
        }
      )

      if (someScoringSystemIsInvalid) {
        return badRequest(new InvalidFieldError('scoringSystem'))
      }

      if (body.teams) {
        const someTeamIsInvalid = body.teams.some((team) => !team.name)

        if (someTeamIsInvalid) {
          return badRequest(new InvalidFieldError('teams'))
        }
      }

      if (body.drivers) {
        const someDriverIsInvalid = DriverHelpers.verifyIfAreInvalid(
          body.drivers
        )

        if (someDriverIsInvalid) {
          return badRequest(new InvalidFieldError('drivers'))
        }
      }

      const championship = await this.championshipService.create({
        createChampionshipDto: { ...body, avatarImage: httpRequest.file }
      })

      return created(championship)
    } catch (_) {
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
