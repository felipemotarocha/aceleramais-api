import {
  InvalidFieldError,
  MissingParamError
} from '../../errors/controllers.errors'
import { badRequest, created } from '../../helpers/controllers.helpers'
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

    const championship = await this.championshipService.create({
      createChampionshipDto: httpRequest.body
    })

    return created(championship)
  }

  getOne(httpRequest: HttpRequest): Promise<HttpResponse> {
    throw new Error('Method not implemented.')
  }
}
