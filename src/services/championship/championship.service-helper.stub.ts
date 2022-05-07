import Bonification from '../../entities/bonification.entity'
import Penalty from '../../entities/penalty.entity'
import Race from '../../entities/race.entity'
import { validBonification } from '../../repositories/bonification/bonification.repository.stub'
import { validPenalty } from '../../repositories/penalty/penalty.repository.stub'
import { validRace } from '../../repositories/race/race.repository.stub'
import { validTeam } from '../../repositories/team/team.repository.stub'
import {
  ChampionshipServiceHelperAbstract,
  CreatePenaltiesAndBonificationsParams,
  CreateRacesParams,
  PrepareToUpdateParams,
  UpdateRacesParams
} from './championship.service-helper.types'

class ChampionshipServiceHelperStub
implements ChampionshipServiceHelperAbstract {
  async prepareToUpdate(params: PrepareToUpdateParams): Promise<void> {}

  async updateRaces(params: UpdateRacesParams): Promise<Race[]> {
    return [validRace]
  }

  async createPenaltiesAndBonifications(
    params: CreatePenaltiesAndBonificationsParams
  ): Promise<{ penalties: Penalty[]; bonifications: Bonification[] }> {
    return { penalties: [validPenalty], bonifications: [validBonification] }
  }

  async createDriversAndTeams() {
    return { teams: [validTeam], drivers: [] }
  }

  async createRaces(params: CreateRacesParams): Promise<Race[]> {
    return [validRace]
  }
}

export default ChampionshipServiceHelperStub
