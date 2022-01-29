import Championship from '../../entities/championship.entity'
import {
  InvalidFieldError,
  MissingParamError
} from '../../errors/controllers.errors'
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
      races: [{ startDate: 'valid_start_date', track: 'valid_track' }],
      teams: [{ name: 'valid_name', color: 'valid_color' }],
      drivers: [{ user: 'valid_user', isRegistered: true }],
      scoringSystem: { 1: 25, 2: 20 },
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
      races: [{ startDate: 'valid_start_date', track: 'valid_track' }],
      teams: [{ name: 'valid_name', color: 'valid_color' }],
      drivers: [{ user: 'valid_user', isRegistered: true }],
      scoringSystem: { 1: 25, 2: 20 },
      teamStandings: 'valid_team_standings',
      driverStandings: 'valid_driver_standings'
    }

    await sut.create({ body: dto })

    expect(createChampionshipSpy).toHaveBeenCalledWith({
      createChampionshipDto: dto
    })
  })

  it('should return 400 if no name is provided', async () => {
    const { sut } = makeSut()

    const dto = {
      description: 'valid_description',
      platform: 'valid_platform',
      avatarImageUrl: 'valid_url',
      races: [{ startDate: 'valid_start_date', track: 'valid_track' }],
      teams: [{ name: 'valid_name', color: 'valid_color' }],
      drivers: [{ user: 'valid_user', isRegistered: true }],
      scoringSystem: { 1: 25, 2: 20 },
      teamStandings: 'valid_team_standings',
      driverStandings: 'valid_driver_standings'
    }

    const result = await sut.create({ body: dto })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(new MissingParamError('name'))
  })

  it('should return 400 if no description is provided', async () => {
    const { sut } = makeSut()

    const dto = {
      name: 'valid_name',
      platform: 'valid_platform',
      avatarImageUrl: 'valid_url',
      races: [{ startDate: 'valid_start_date', track: 'valid_track' }],
      teams: [{ name: 'valid_name', color: 'valid_color' }],
      drivers: [{ user: 'valid_user', isRegistered: true }],
      scoringSystem: { 1: 25, 2: 20 },
      teamStandings: 'valid_team_standings',
      driverStandings: 'valid_driver_standings'
    }

    const result = await sut.create({ body: dto })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(new MissingParamError('description'))
  })

  it('should return 400 if no platform is provided', async () => {
    const { sut } = makeSut()

    const dto = {
      name: 'valid_name',
      description: 'valid_description',
      avatarImageUrl: 'valid_url',
      races: [{ startDate: 'valid_start_date', track: 'valid_track' }],
      teams: [{ name: 'valid_name', color: 'valid_color' }],
      drivers: [{ user: 'valid_user', isRegistered: true }],
      scoringSystem: { 1: 25, 2: 20 },
      teamStandings: 'valid_team_standings',
      driverStandings: 'valid_driver_standings'
    }

    const result = await sut.create({ body: dto })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(new MissingParamError('platform'))
  })

  it('should return 400 if no races are provided', async () => {
    const { sut } = makeSut()

    const dto = {
      name: 'valid_name',
      description: 'valid_description',
      avatarImageUrl: 'valid_url',
      platform: 'valid_platform',
      teams: [{ name: 'valid_name', color: 'valid_color' }],
      drivers: [{ user: 'valid_user', isRegistered: true }],
      scoringSystem: { 1: 25, 2: 20 },
      teamStandings: 'valid_team_standings',
      driverStandings: 'valid_driver_standings'
    }

    const result = await sut.create({ body: dto })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(new MissingParamError('races'))
  })

  it('should return 400 if no scoring system is provided', async () => {
    const { sut } = makeSut()

    const dto = {
      name: 'valid_name',
      description: 'valid_description',
      avatarImageUrl: 'valid_url',
      platform: 'valid_platform',
      teams: [{ name: 'valid_name', color: 'valid_color' }],
      drivers: [{ user: 'valid_user', isRegistered: true }],
      races: [{ startDate: 'valid_start_date', track: 'valid_track' }],
      teamStandings: 'valid_team_standings',
      driverStandings: 'valid_driver_standings'
    }

    const result = await sut.create({ body: dto })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(new MissingParamError('scoringSystem'))
  })

  it('should return 400 if no scoring system is provided', async () => {
    const { sut } = makeSut()

    const dto = {
      name: 'valid_name',
      description: 'valid_description',
      avatarImageUrl: 'valid_url',
      platform: 'valid_platform',
      teams: [{ name: 'valid_name', color: 'valid_color' }],
      drivers: [{ user: 'valid_user', isRegistered: true }],
      races: [{ startDate: 'valid_start_date', track: 'valid_track' }],
      teamStandings: 'valid_team_standings',
      driverStandings: 'valid_driver_standings'
    }

    const result = await sut.create({ body: dto })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(new MissingParamError('scoringSystem'))
  })

  it('should return 400 if some race does not contain a track', async () => {
    const { sut } = makeSut()

    const dto = {
      description: 'valid_description',
      name: 'valid_name',
      platform: 'valid_platform',
      avatarImageUrl: 'valid_url',
      races: [{ startDate: 'valid_start_date', track: null }],
      teams: [{ name: 'valid_name', color: 'valid_color' }],
      drivers: [{ user: 'valid_user', isRegistered: true }],
      scoringSystem: { 1: 25, 2: 20 },
      teamStandings: 'valid_team_standings',
      driverStandings: 'valid_driver_standings'
    }

    const result = await sut.create({ body: dto })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(new InvalidFieldError('races'))
  })

  it('should return 400 if some race does not contain a start date', async () => {
    const { sut } = makeSut()

    const dto = {
      description: 'valid_description',
      name: 'valid_name',
      platform: 'valid_platform',
      avatarImageUrl: 'valid_url',
      races: [{ startDate: null, track: 'valid_track' }],
      teams: [{ name: 'valid_name', color: 'valid_color' }],
      drivers: [{ user: 'valid_user', isRegistered: true }],
      scoringSystem: { 1: 25, 2: 20 },
      teamStandings: 'valid_team_standings',
      driverStandings: 'valid_driver_standings'
    }

    const result = await sut.create({ body: dto })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(new InvalidFieldError('races'))
  })

  it('should return 400 if scoring system is invalid', async () => {
    const { sut } = makeSut()

    const dto = {
      description: 'valid_description',
      name: 'valid_name',
      platform: 'valid_platform',
      avatarImageUrl: 'valid_url',
      races: [{ startDate: 'valid_start_date', track: 'valid_track' }],
      teams: [{ name: 'valid_name', color: 'valid_color' }],
      drivers: [{ user: 'valid_user', isRegistered: true }],
      scoringSystem: { 1: 'a' },
      teamStandings: 'valid_team_standings',
      driverStandings: 'valid_driver_standings'
    }

    const result = await sut.create({ body: dto })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(new InvalidFieldError('scoringSystem'))
  })

  it('should return 400 if scoring system is invalid', async () => {
    const { sut } = makeSut()

    const dto = {
      description: 'valid_description',
      name: 'valid_name',
      platform: 'valid_platform',
      avatarImageUrl: 'valid_url',
      races: [{ startDate: 'valid_start_date', track: 'valid_track' }],
      teams: [{ name: 'valid_name', color: 'valid_color' }],
      drivers: [{ user: 'valid_user', isRegistered: true }],
      scoringSystem: { a: 1 },
      teamStandings: 'valid_team_standings',
      driverStandings: 'valid_driver_standings'
    }

    const result = await sut.create({ body: dto })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(new InvalidFieldError('scoringSystem'))
  })

  it('should return 400 if some team is invalid', async () => {
    const { sut } = makeSut()

    const dto = {
      description: 'valid_description',
      name: 'valid_name',
      platform: 'valid_platform',
      avatarImageUrl: 'valid_url',
      races: [{ startDate: 'valid_start_date', track: 'valid_track' }],
      teams: [{ name: null, color: 'valid_color' }],
      drivers: [{ user: 'valid_user', isRegistered: true }],
      scoringSystem: { 1: 20 },
      teamStandings: 'valid_team_standings',
      driverStandings: 'valid_driver_standings'
    }

    const result = await sut.create({ body: dto })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(new InvalidFieldError('teams'))
  })
})
