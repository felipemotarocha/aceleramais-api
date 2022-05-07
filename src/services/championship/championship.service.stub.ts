import { Championship, ChampionshipServiceAbstract, Race } from '.'
import { validRace } from '../race/race.service.stub'

export const validChampionship: Championship = {
  id: 'valid_id',
  code: 'valid_code',
  description: 'valid_description',
  name: 'valid_name',
  platform: 'valid_platform',
  avatarImageUrl: 'valid_url',
  races: ['valid_race'],
  teams: ['valid_team'],
  pendentDrivers: [],
  drivers: [
    {
      user: 'valid_user',
      isRegistered: true,
      isRemoved: false,
      bonifications: [],
      penalties: []
    }
  ],
  scoringSystem: 'valid_scoring_system',
  teamStandings: 'valid_team_standings',
  driverStandings: 'valid_driver_standings',
  admins: [{ user: 'valid_user', isCreator: true }],
  bonifications: ['valid_bonification'],
  penalties: ['valid_penalty']
}

export class ChampionshipServiceStub implements ChampionshipServiceAbstract {
  async create(): Promise<Championship> {
    return validChampionship
  }

  async getOne(): Promise<Championship> {
    return validChampionship
  }

  async getAll(): Promise<Championship[]> {
    return [validChampionship]
  }

  async update(): Promise<Championship> {
    return validChampionship
  }

  async prepareToUpdate(): Promise<void> {}

  async updateRaces(): Promise<Race[]> {
    return [validRace]
  }

  async createDriversAndTeams() {
    return { drivers: [], teams: [] }
  }

  async createPenaltiesAndBonifications() {
    return { bonifications: [], penalties: [] }
  }

  async delete(): Promise<Championship> {
    return validChampionship
  }
}
