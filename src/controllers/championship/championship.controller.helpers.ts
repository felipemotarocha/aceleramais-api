import {
  CreateChampionshipDto,
  UpdateChampionshipDto
} from '../../dtos/championship.dtos'
import {
  MissingParamError,
  InvalidFieldError
} from '../../errors/controllers.errors'
import { badRequest } from '../../helpers/controllers.helpers'
import DriverHelpers from '../../helpers/driver.helpers'
import { HttpResponse } from '../../protocols/controllers.protocols'

const ChampionshipControllerHelper = {
  validateDto: (params: {
    dto: CreateChampionshipDto | UpdateChampionshipDto
    requiredFields: string[]
  }): HttpResponse | void => {
    const { dto, requiredFields } = params

    for (const field of requiredFields) {
      if (!dto[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    if ((dto as any).races) {
      const someRaceIsInvalid = (dto as any).races.some(
        (race) => !race.track || !race.startDate
      )

      if (someRaceIsInvalid) {
        return badRequest(new InvalidFieldError('races'))
      }
    }

    const someScoringSystemIsInvalid = Object.keys(dto.scoringSystem).some(
      (key) => {
        return (
          ![...Array(50).keys()].includes(parseInt(key)) ||
          typeof dto.scoringSystem[key] !== 'number'
        )
      }
    )

    if (someScoringSystemIsInvalid) {
      return badRequest(new InvalidFieldError('scoringSystem'))
    }

    if (dto.teams) {
      const someTeamIsInvalid = dto.teams.some((team) => !team.name)

      if (someTeamIsInvalid) {
        return badRequest(new InvalidFieldError('teams'))
      }
    }

    if (dto.drivers) {
      const someDriverIsInvalid = DriverHelpers.verifyIfAreInvalid(
        (dto as any).drivers
      )

      if (someDriverIsInvalid) {
        return badRequest(new InvalidFieldError('drivers'))
      }
    }

    if (dto.drivers && dto.pendentDrivers) {
      const somePendentDriverIsInvalid = dto.pendentDrivers.some((item) =>
        dto.drivers!.some((driver) => driver?.user === item.user)
      )

      if (somePendentDriverIsInvalid) {
        return badRequest(new InvalidFieldError('pendentDrivers'))
      }
    }
  }
}

export default ChampionshipControllerHelper
