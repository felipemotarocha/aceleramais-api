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
import {
  HttpRequest,
  HttpResponse
} from '../../protocols/controllers.protocols'
import { ChampionshipServiceAbstract } from '../../services/championship/championship.service'

export interface ChampionshipControllerAbstract {
  create(httpRequest: HttpRequest): Promise<HttpResponse>
  getOne(httpRequest: HttpRequest): Promise<HttpResponse>
}

export class ChampionshipController implements ChampionshipControllerAbstract {
  private readonly championshipService: ChampionshipServiceAbstract

  constructor(championshipService: ChampionshipServiceAbstract) {
    this.championshipService = championshipService
  }

  async create(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = [
        'name',
        'description',
        'platform',
        'races',
        'scoringSystem'
      ]

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const someRaceIsInvalid = httpRequest.body.races.some(
        (race) => !race.track || !race.startDate
      )

      if (someRaceIsInvalid) {
        return badRequest(new InvalidFieldError('races'))
      }

      const someScoringSystemIsInvalid = Object.keys(
        httpRequest.body.scoringSystem
      ).some((key) => {
        return (
          ![...Array(50).keys()].includes(parseInt(key)) ||
          typeof httpRequest.body.scoringSystem[key] !== 'number'
        )
      })

      if (someScoringSystemIsInvalid) {
        return badRequest(new InvalidFieldError('scoringSystem'))
      }

      if (httpRequest.body.teams) {
        const someTeamIsInvalid = httpRequest.body.teams.some(
          (team) => !team.name
        )

        if (someTeamIsInvalid) {
          return badRequest(new InvalidFieldError('teams'))
        }
      }

      if (httpRequest.body.drivers) {
        const someDriverIsInvalid = httpRequest.body.drivers.some(
          (item) =>
            (!item.user && item.isRegistered) ||
            (item.user && item.userName) ||
            (item.user && !item.isRegistered) ||
            (item.userName && item.isRegistered) ||
            item.isRegistered === undefined ||
            item.isRegistered === null
        )

        if (someDriverIsInvalid) {
          return badRequest(new InvalidFieldError('drivers'))
        }
      }

      const championship = await this.championshipService.create({
        createChampionshipDto: httpRequest.body
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

      const scoringSystem = await this.championshipService.getOne({
        id: httpRequest.params.id
      })

      return ok(scoringSystem)
    } catch (_) {
      return serverError()
    }
  }
}
