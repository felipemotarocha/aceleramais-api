import { UpdateChampionshipDto } from '../../dtos/championship.dtos'
import Championship from '../../entities/championship.entity'
import {
  InvalidFieldError,
  MissingParamError,
  ServerError
} from '../../errors/controllers.errors'
import { ChampionshipServiceAbstract } from '../../services/championship/championship.service'
import DriverStandingsServiceStub from '../../services/driver-standings/driver-standings.service.stub'
import TeamStandingsServiceStub from '../../services/team-standings/team-standings.service.stub'
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
    drivers: [
      {
        user: 'valid_user',
        isRegistered: true,
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

  interface SutTypes {
    championshipServicestub: ChampionshipServiceAbstract
    teamStandingsServiceStub: TeamStandingsServiceStub
    driverStandingsServiceStub: DriverStandingsServiceStub
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

      async getAll(): Promise<Championship[]> {
        return [validChampionship]
      }

      async update(): Promise<Championship> {
        return validChampionship
      }

      async prepareToUpdate(): Promise<void> {}

      async delete(): Promise<Championship> {
        return validChampionship
      }
    }

    const championshipServicestub = new ChampionshipServiceStub()
    const driverStandingsServiceStub = new DriverStandingsServiceStub()
    const teamStandingsServiceStub = new TeamStandingsServiceStub()

    const sut = new ChampionshipController(
      championshipServicestub,
      driverStandingsServiceStub,
      teamStandingsServiceStub
    )

    return {
      sut,
      championshipServicestub,
      driverStandingsServiceStub,
      teamStandingsServiceStub
    }
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
      driverStandings: 'valid_driver_standings',
      admins: [{ user: 'valid_user', isCreator: true }]
    }

    const result = await sut.create({ body: { data: JSON.stringify(dto) } })

    expect(result.statusCode).toBe(201)
    expect(result.body).toStrictEqual(validChampionship)
  })

  it('should call ChampionshipService create method with correct values', async () => {
    const { sut, championshipServicestub } = makeSut()

    const createChampionshipSpy = jest.spyOn(championshipServicestub, 'create')

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
      driverStandings: 'valid_driver_standings',
      admins: [{ user: 'valid_user', isCreator: true }]
    }

    await sut.create({ body: { data: JSON.stringify(dto) } })

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
      driverStandings: 'valid_driver_standings',
      admins: [{ user: 'valid_user', isCreator: true }]
    }

    const result = await sut.create({ body: { data: JSON.stringify(dto) } })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(new MissingParamError('name'))
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
      driverStandings: 'valid_driver_standings',
      admins: [{ user: 'valid_user', isCreator: true }]
    }

    const result = await sut.create({ body: { data: JSON.stringify(dto) } })

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
      driverStandings: 'valid_driver_standings',
      admins: [{ user: 'valid_user', isCreator: true }]
    }

    const result = await sut.create({ body: { data: JSON.stringify(dto) } })

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
      driverStandings: 'valid_driver_standings',
      admins: [{ user: 'valid_user', isCreator: true }]
    }

    const result = await sut.create({ body: { data: JSON.stringify(dto) } })

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
      driverStandings: 'valid_driver_standings',
      admins: [{ user: 'valid_user', isCreator: true }]
    }

    const result = await sut.create({ body: { data: JSON.stringify(dto) } })

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
      driverStandings: 'valid_driver_standings',
      admins: [{ user: 'valid_user', isCreator: true }]
    }

    const result = await sut.create({ body: { data: JSON.stringify(dto) } })

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
      driverStandings: 'valid_driver_standings',
      admins: [{ user: 'valid_user', isCreator: true }]
    }

    const result = await sut.create({ body: { data: JSON.stringify(dto) } })

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
      driverStandings: 'valid_driver_standings',
      admins: [{ user: 'valid_user', isCreator: true }]
    }

    const result = await sut.create({ body: { data: JSON.stringify(dto) } })

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
      driverStandings: 'valid_driver_standings',
      admins: [{ user: 'valid_user', isCreator: true }]
    }

    const result = await sut.create({ body: { data: JSON.stringify(dto) } })

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
      driverStandings: 'valid_driver_standings',
      admins: [{ user: 'valid_user', isCreator: true }]
    }

    const result = await sut.create({ body: { data: JSON.stringify(dto) } })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(new InvalidFieldError('teams'))
  })

  it('should return 400 if some driver is invalid', async () => {
    const { sut } = makeSut()

    const dto = {
      description: 'valid_description',
      name: 'valid_name',
      platform: 'valid_platform',
      avatarImageUrl: 'valid_url',
      races: [{ startDate: 'valid_start_date', track: 'valid_track' }],
      teams: [{ name: 'valid_team', color: 'valid_color' }],
      drivers: [
        {
          firstName: 'valid_first_name',
          lastName: 'valid_last_name',
          isRegistered: true
        }
      ],
      scoringSystem: { 1: 20 },
      teamStandings: 'valid_team_standings',
      driverStandings: 'valid_driver_standings',
      admins: [{ user: 'valid_user', isCreator: true }]
    }

    const result = await sut.create({ body: { data: JSON.stringify(dto) } })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(new InvalidFieldError('drivers'))
  })

  it('should return 400 if some driver is invalid', async () => {
    const { sut } = makeSut()

    const dto = {
      description: 'valid_description',
      name: 'valid_name',
      platform: 'valid_platform',
      avatarImageUrl: 'valid_url',
      races: [{ startDate: 'valid_start_date', track: 'valid_track' }],
      teams: [{ name: 'valid_team', color: 'valid_color' }],
      drivers: [
        { user: 'valid_user', isRegistered: false },
        { isRegistered: false, id: undefined }
      ],
      scoringSystem: { 1: 20 },
      teamStandings: 'valid_team_standings',
      driverStandings: 'valid_driver_standings',
      admins: [{ user: 'valid_user', isCreator: true }]
    }

    const result = await sut.create({ body: { data: JSON.stringify(dto) } })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(new InvalidFieldError('drivers'))
  })

  it('should return 400 if some driver is invalid', async () => {
    const { sut } = makeSut()

    const dto = {
      description: 'valid_description',
      name: 'valid_name',
      platform: 'valid_platform',
      avatarImageUrl: 'valid_url',
      races: [{ startDate: 'valid_start_date', track: 'valid_track' }],
      teams: [{ name: 'valid_team', color: 'valid_color' }],
      drivers: [{ user: 'valid_user' }],
      scoringSystem: { 1: 20 },
      teamStandings: 'valid_team_standings',
      driverStandings: 'valid_driver_standings',
      admins: [{ user: 'valid_user', isCreator: true }]
    }

    const result = await sut.create({ body: { data: JSON.stringify(dto) } })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(new InvalidFieldError('drivers'))
  })

  it('should return 400 if some driver is invalid', async () => {
    const { sut } = makeSut()

    const dto = {
      description: 'valid_description',
      name: 'valid_name',
      platform: 'valid_platform',
      avatarImageUrl: 'valid_url',
      races: [{ startDate: 'valid_start_date', track: 'valid_track' }],
      teams: [{ name: 'valid_team', color: 'valid_color' }],
      drivers: [{ firstName: 'valid_first_name', lastName: 'valid_last_name' }],
      scoringSystem: { 1: 20 },
      teamStandings: 'valid_team_standings',
      driverStandings: 'valid_driver_standings',
      admins: [{ user: 'valid_user', isCreator: true }]
    }

    const result = await sut.create({ body: { data: JSON.stringify(dto) } })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(new InvalidFieldError('drivers'))
  })

  it('should return 500 if ChampionshipService create method throws', async () => {
    const { sut, championshipServicestub } = makeSut()

    jest
      .spyOn(championshipServicestub, 'create')
      .mockReturnValueOnce(
        new Promise((_resolve, reject) => reject(new Error()))
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
      driverStandings: 'valid_driver_standings',
      admins: [{ user: 'valid_user', isCreator: true }]
    }

    const result = await sut.create({ body: { data: JSON.stringify(dto) } })

    expect(result.statusCode).toBe(500)
    expect(result.body).toStrictEqual(new ServerError())
  })

  it('should update a Championship', async () => {
    const { sut, driverStandingsServiceStub, teamStandingsServiceStub } =
      makeSut()

    const refreshDriverStandingsSpy = jest.spyOn(
      driverStandingsServiceStub,
      'refresh'
    )
    const refreshTeamStandingsSpy = jest.spyOn(
      teamStandingsServiceStub,
      'refresh'
    )

    const dto: UpdateChampionshipDto = {
      teams: [{ name: 'valid_name', color: 'valid_color', id: 'valid_id' }],
      drivers: [{ user: 'valid_user', isRegistered: true }],
      penalties: [{ name: 'valid_penalty', points: 1, race: 'valid_race' }],
      bonifications: [
        { name: 'valid_bonification', points: 1, race: 'valid_race' }
      ],
      scoringSystem: { 1: 25, 2: 20 }
    }

    const result = await sut.update({
      params: { id: validChampionship.id },
      body: { data: JSON.stringify(dto) }
    })

    expect(result.statusCode).toBe(200)

    expect(refreshDriverStandingsSpy).toHaveBeenCalledWith(validChampionship.id)
    expect(refreshTeamStandingsSpy).toHaveBeenCalledWith(validChampionship.id)
  })

  it('should return 200 on getting a Championship by ID', async () => {
    const { sut } = makeSut()

    const result = await sut.getOne({ params: { id: 'valid_id' } })

    expect(result.statusCode).toBe(200)
    expect(result.body).toStrictEqual(validChampionship)
  })

  it('should return 400 when getting a Championship without providing a params', async () => {
    const { sut } = makeSut()

    const result = await sut.getOne({ params: undefined })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(new MissingParamError('params'))
  })

  it('should return 400 when getting a Championship without providing a Championship', async () => {
    const { sut } = makeSut()

    const result = await sut.getOne({ params: { id: null as any } })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(new MissingParamError('id'))
  })

  it('should return 500 if DriverStandingsService getOne method throws', async () => {
    const { sut, championshipServicestub } = makeSut()

    jest
      .spyOn(championshipServicestub, 'getOne')
      .mockReturnValueOnce(
        new Promise((_resolve, reject) => reject(new Error()))
      )

    const result = await sut.getOne({
      params: { id: 'valid_id' }
    })

    expect(result.statusCode).toBe(500)
    expect(result.body).toStrictEqual(new ServerError())
  })

  it('should return 200 on getting Championships by Driver', async () => {
    const { sut } = makeSut()

    const result = await sut.getAll({ query: { driver: 'valid_user' } })

    expect(result.statusCode).toBe(200)
    expect(result.body).toStrictEqual([validChampionship])
  })

  it('should return 400 when getting Championships without providing a Driver', async () => {
    const { sut } = makeSut()

    const result = await sut.getAll({ query: { driver: null as any } })

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(new MissingParamError('driver'))
  })

  it('should return 500 if DriverStandingsService getAll method throws', async () => {
    const { sut, championshipServicestub } = makeSut()

    jest
      .spyOn(championshipServicestub, 'getAll')
      .mockReturnValueOnce(
        new Promise((_resolve, reject) => reject(new Error()))
      )

    const result = await sut.getAll({
      query: { driver: 'valid_user' }
    })

    expect(result.statusCode).toBe(500)
    expect(result.body).toStrictEqual(new ServerError())
  })
})
