import {
  InvalidFieldError,
  MissingParamError,
  NotAllowedFieldsError,
  ServerError
} from '../../errors/controllers.errors'
import { badRequest, ok, unauthorized } from '../../helpers/controllers.helpers'
import {
  HttpRequest,
  HttpResponse
} from '../../protocols/controllers.protocols'
import { ChampionshipServiceAbstract, User } from '../../services/championship'
import { DriverStandingsServiceAbstract } from '../../services/driver-standings/driver-standings.service'
import { RaceClassificationServiceAbstract } from '../../services/race-classification/race-classification.service'
import { RaceServiceAbstract } from '../../services/race/race.service'
import { TeamStandingsServiceAbstract } from '../../services/team-standings/team-standings.service'

export interface RaceClassificationControllerAbstract {
  getOne(httpRequest: HttpRequest): Promise<HttpResponse>
  update(httpRequest: HttpRequest): Promise<HttpResponse>
}

class RaceClassificationController
implements RaceClassificationControllerAbstract {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private readonly raceClassificationService: RaceClassificationServiceAbstract,
    private readonly driverStandingsService: DriverStandingsServiceAbstract,
    private readonly teamStandingsService: TeamStandingsServiceAbstract,
    private readonly raceService: RaceServiceAbstract,
    private readonly championshipService: ChampionshipServiceAbstract
  ) {}

  async getOne(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.query?.race) {
        return badRequest(new MissingParamError('race'))
      }

      const raceClassification = await this.raceClassificationService.getOne(
        httpRequest.query!.race!
      )

      return ok(raceClassification)
    } catch (_e) {
      return badRequest(new ServerError())
    }
  }

  async update(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.query?.race) {
        return badRequest(new MissingParamError('race'))
      }

      const allowedUpdates = ['classification']

      const someReceivedUpdateIsNotAllowed = Object.keys(httpRequest.body).some(
        (update) => !allowedUpdates.includes(update)
      )

      if (someReceivedUpdateIsNotAllowed) {
        return badRequest(new NotAllowedFieldsError())
      }

      const someUserIsInvalid = httpRequest.body.classification.some(
        (item) =>
          (!item.user && item.isRegistered) ||
          (item.user && item.userName) ||
          (item.user && !item.isRegistered) ||
          (item.userName && item.isRegistered)
      )

      if (someUserIsInvalid) {
        return badRequest(
          new Error('Some user provided on the classification is invalid.')
        )
      }

      const race = await this.raceService.getOne(httpRequest.query.race)

      if (!race) {
        return badRequest(new InvalidFieldError('race'))
      }

      const championship = await this.championshipService.getOne({
        id: race.championship
      })

      const userIsNotChampionshipAdmin = championship!.admins.every(
        (a) => (a.user as User).id !== httpRequest.user
      )

      if (userIsNotChampionshipAdmin) {
        return unauthorized()
      }

      const raceClassification = await this.raceClassificationService.update(
        httpRequest.query!.id,
        httpRequest.body
      )

      await this.raceClassificationService.refresh(race.championship)
      await this.driverStandingsService.refresh(race.championship)
      await this.teamStandingsService.refresh(race.championship)

      return ok(raceClassification)
    } catch (error) {
      return badRequest(new ServerError())
    }
  }
}

export default RaceClassificationController
