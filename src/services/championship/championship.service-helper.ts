import {
  ChampionshipServiceHelperAbstract,
  PrepareToUpdateParams,
  UpdateRacesParams,
  Race,
  CreatePenaltiesAndBonificationsParams,
  CreateDriversAndTeamsParams,
  Bonification,
  Penalty,
  User,
  Team
} from '.'

class ChampionshipServiceHelper implements ChampionshipServiceHelperAbstract {
  prepareToUpdate(params: PrepareToUpdateParams): Promise<void> {
    throw new Error('Method not implemented.')
  }

  updateRaces(params: UpdateRacesParams): Promise<Race[]> {
    throw new Error('Method not implemented.')
  }

  createPenaltiesAndBonifications(
    params: CreatePenaltiesAndBonificationsParams
  ): Promise<{ penalties: Penalty[]; bonifications: Bonification[] }> {
    throw new Error('Method not implemented.')
  }

  createDriversAndTeams(
    params: CreateDriversAndTeamsParams
  ): Promise<{ drivers: User[]; teams: Team[] }> {
    throw new Error('Method not implemented.')
  }
}

export default ChampionshipServiceHelper
