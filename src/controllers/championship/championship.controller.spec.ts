import Championship from '../../entities/championship.entity'
import { ChampionshipServiceAbstract } from '../../services/championship/championship.service'
import {
  ChampionshipControllerAbstract,
  ChampionshipController
} from './championship.controller'

describe('Championship Controller', () => {
  const validChampionship: Championship = {
    id: 'valid_id',
    description: 'valid_description',
    name: 'valid_name',
    platform: 'valid_platform',
    avatarImageUrl: 'valid_url',
    races: ['valid_race'],
    teams: ['valid_team'],
    drivers: [{ user: 'valid_user', isRegistered: true }],
    scoringSystem: 'valid_scoring_system',
    teamStandings: 'valid_team_standings',
    driverStandings: 'valid_driver_standings'
  }

  interface SutTypes {
    championshipStandingsServiceStub: ChampionshipServiceAbstract
    sut: ChampionshipControllerAbstract
  }

  const makeSut = (): SutTypes => {
    class ChampionshipServiceStub implements ChampionshipServiceAbstract {
      async create(): Promise<Championship> {
        return validChampionship
      }

      async getOne(): Promise<Championship> {
        return validChampionship
      }

      async update(): Promise<Championship> {
        return validChampionship
      }

      async delete(): Promise<Championship> {
        return validChampionship
      }
    }

    const championshipStandingsServiceStub = new ChampionshipServiceStub()
    const sut = new ChampionshipController(championshipStandingsServiceStub)

    return { sut, championshipStandingsServiceStub }
  }

  it('should return 201 on creation success', async () => {
    const { sut } = makeSut()

    const dto = {
      description: 'valid_description',
      name: 'valid_name',
      platform: 'valid_platform',
      avatarImageUrl: 'valid_url',
      races: ['valid_race'],
      teams: ['valid_team'],
      drivers: [{ user: 'valid_user', isRegistered: true }],
      scoringSystem: 'valid_scoring_system',
      teamStandings: 'valid_team_standings',
      driverStandings: 'valid_driver_standings'
    }

    const result = await sut.create({ body: dto })

    expect(result.statusCode).toBe(201)
    expect(result.body).toStrictEqual(validChampionship)
  })

  it('should call ChampionshipService create method with correct values', async () => {
    const { sut, championshipStandingsServiceStub } = makeSut()

    const createChampionshipSpy = jest.spyOn(
      championshipStandingsServiceStub,
      'create'
    )

    const dto = {
      description: 'valid_description',
      name: 'valid_name',
      platform: 'valid_platform',
      avatarImageUrl: 'valid_url',
      races: ['valid_race'],
      teams: ['valid_team'],
      drivers: [{ user: 'valid_user', isRegistered: true }],
      scoringSystem: 'valid_scoring_system',
      teamStandings: 'valid_team_standings',
      driverStandings: 'valid_driver_standings'
    }

    await sut.create({ body: dto })

    expect(createChampionshipSpy).toHaveBeenCalledWith({
      createChampionshipDto: dto
    })
  })
})
