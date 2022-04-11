import Championship from '../../entities/championship.entity'
import { ChampionshipRepositoryAbstract } from './championship.repository'

export const validChampionship: Championship = {
  id: 'valid_id',
  description: 'valid_description',
  name: 'valid_name',
  platform: 'valid_platform',
  avatarImageUrl: 'valid_url',
  races: ['valid_race'],
  teams: ['valid_team'],
  drivers: [
    { user: 'valid_user', isRegistered: true, penalties: [], bonifications: [] }
  ],
  admins: [],
  scoringSystem: 'valid_scoring_system',
  teamStandings: 'valid_team_standings',
  driverStandings: 'valid_driver_standings',
  bonifications: ['valid_bonification'],
  penalties: ['valid_penalty']
}

class ChampionshipRepositoryStub implements ChampionshipRepositoryAbstract {
  async create(): Promise<Championship> {
    return validChampionship
  }

  async update(): Promise<Championship> {
    return validChampionship
  }

  async getOne(): Promise<Championship> {
    return validChampionship
  }

  async getAll(): Promise<Championship[]> {
    return [validChampionship]
  }
}

export default ChampionshipRepositoryStub
