import mongoose from 'mongoose'
import { ChampionshipServiceSutFactory, validChampionship } from '.'

describe('Championship Service', () => {
  const makeSut = ChampionshipServiceSutFactory.make

  const session = {
    startTransaction: jest.fn(),
    commitTransaction: jest.fn(),
    endSession: jest.fn()
  }

  jest.spyOn(mongoose, 'startSession').mockImplementation(() => session)

  it('should create the Championship', async () => {
    const { sut, championshipRepositoryStub } = makeSut()

    jest
      .spyOn(championshipRepositoryStub, 'getOne')
      .mockReturnValueOnce(Promise.resolve(null))

    const result = await sut.create({
      id: validChampionship.id,
      dto: {
        description: 'valid_description',
        name: 'valid_name',
        platform: 'valid_platform',
        avatarImageUrl: 'valid_url',
        races: [{ track: 'valid_track', startDate: 'valid_start_date' }],
        teams: [{ id: 'valid_id', name: 'valid_name', color: 'valid_color' }],
        drivers: [
          {
            user: 'valid_user',
            isRegistered: true,
            isRemoved: false,
            team: 'valid_id'
          }
        ],
        admins: [],
        scoringSystem: { 1: 25 }
      }
    })

    expect(result).toStrictEqual(validChampionship)
  })

  it('should update a Championship', async () => {
    const { sut, championshipServiceHelperStub } = makeSut()

    const session = {
      startTransaction: jest.fn(),
      commitTransaction: jest.fn(),
      endSession: jest.fn()
    }

    jest.spyOn(mongoose, 'startSession').mockImplementationOnce(() => session)

    const prepareToUpdateSpy = jest.spyOn(
      championshipServiceHelperStub,
      'prepareToUpdate'
    )
    const createDriversAndTeamsSpy = jest.spyOn(
      championshipServiceHelperStub,
      'createDriversAndTeams'
    )
    const createPenaltiesAndBonificationsSpy = jest.spyOn(
      championshipServiceHelperStub,
      'createPenaltiesAndBonifications'
    )
    const updateRacesSpy = jest.spyOn(
      championshipServiceHelperStub,
      'updateRaces'
    )

    const result = await sut.update({
      id: validChampionship.id,
      dto: {
        bonifications: [
          { name: 'valid_bonification', points: 1, id: 'valid_id' }
        ],
        drivers: [
          {
            isRegistered: true,
            isRemoved: false,
            team: '1',
            user: 'valid_user'
          }
        ],
        penalties: [{ name: 'valid_penalty', points: 1, id: 'valid_id' }],
        teams: [{ id: '1', name: 'Mercedes', color: 'color' }],
        scoringSystem: { 1: 25 },
        races: [
          {
            startDate: 'valid_start_date',
            track: 'valid_track',
            id: 'valid_id'
          },
          { startDate: 'valid_start_date', track: 'valid_track' }
        ]
      }
    })

    expect(prepareToUpdateSpy).toHaveBeenCalledWith({
      championship: validChampionship,
      session
    })
    expect(createDriversAndTeamsSpy).toHaveBeenCalledWith({
      championship: validChampionship.id,
      drivers: [
        { isRegistered: true, isRemoved: false, team: '1', user: 'valid_user' }
      ],
      teams: [{ id: '1', name: 'Mercedes', color: 'color' }],
      session
    })
    expect(createPenaltiesAndBonificationsSpy).toHaveBeenCalledWith({
      championship: validChampionship.id,
      penalties: [{ name: 'valid_penalty', points: 1, id: 'valid_id' }],
      bonifications: [
        { name: 'valid_bonification', points: 1, id: 'valid_id' }
      ],
      session
    })
    expect(updateRacesSpy).toHaveBeenCalledWith({
      championship: validChampionship.id,
      races: [
        {
          startDate: 'valid_start_date',
          track: 'valid_track',
          id: 'valid_id'
        },
        { startDate: 'valid_start_date', track: 'valid_track' }
      ],
      session
    })

    expect(result).toStrictEqual(validChampionship)
  })

  it('should create the Championship Driver Standings', async () => {
    const { sut, driverStandingsRepositoryStub, championshipRepositoryStub } =
      makeSut()

    const createDriverStandingsSpy = jest.spyOn(
      driverStandingsRepositoryStub,
      'create'
    )

    jest
      .spyOn(championshipRepositoryStub, 'getOne')
      .mockReturnValueOnce(Promise.resolve(null))

    const result = await sut.create({
      id: validChampionship.id,
      dto: {
        description: 'valid_description',
        name: 'valid_name',
        platform: 'valid_platform',
        avatarImageUrl: 'valid_url',
        races: [{ track: 'valid_track', startDate: 'valid_start_date' }],
        teams: [{ id: 'valid_id', name: 'valid_name', color: 'valid_color' }],
        drivers: [{ user: 'valid_user', isRegistered: true, isRemoved: false }],
        pendentDrivers: [],
        admins: [],
        scoringSystem: { 1: 25 }
      }
    })

    expect(createDriverStandingsSpy).toHaveBeenCalledWith({
      dto: {
        championship: validChampionship.id,
        standings: []
      },
      session
    })
    expect(createDriverStandingsSpy).toHaveReturned()
    expect(result.driverStandings).toBe('valid_driver_standings')
  })

  it('should create the Championship Team Standings', async () => {
    const { sut, teamStandingsRepositoryStub, championshipRepositoryStub } =
      makeSut()

    const createTeamStandingsSpy = jest.spyOn(
      teamStandingsRepositoryStub,
      'create'
    )

    jest
      .spyOn(championshipRepositoryStub, 'getOne')
      .mockReturnValueOnce(Promise.resolve(null))

    const result = await sut.create({
      id: validChampionship.id,
      dto: {
        description: 'valid_description',
        name: 'valid_name',
        platform: 'valid_platform',
        avatarImageUrl: 'valid_url',
        races: [{ track: 'valid_track', startDate: 'valid_start_date' }],
        teams: [{ id: 'valid_id', name: 'valid_name', color: 'valid_color' }],
        drivers: [{ user: 'valid_user', isRegistered: true, isRemoved: false }],
        pendentDrivers: [],
        admins: [],
        scoringSystem: { 1: 25 }
      }
    })

    expect(createTeamStandingsSpy).toHaveBeenCalledWith({
      dto: {
        championship: validChampionship.id,
        standings: []
      },
      session
    })
    expect(createTeamStandingsSpy).toHaveReturned()
    expect(result.teamStandings).toBe('valid_team_standings')
  })

  it('should create the Championship Scoring System', async () => {
    const { sut, scoringSystemRepositoryStub, championshipRepositoryStub } =
      makeSut()

    const createScoringSystemSpy = jest.spyOn(
      scoringSystemRepositoryStub,
      'create'
    )

    jest
      .spyOn(championshipRepositoryStub, 'getOne')
      .mockReturnValueOnce(Promise.resolve(null))

    const result = await sut.create({
      id: validChampionship.id,
      dto: {
        description: 'valid_description',
        name: 'valid_name',
        platform: 'valid_platform',
        avatarImageUrl: 'valid_url',
        races: [{ track: 'valid_track', startDate: 'valid_start_date' }],
        teams: [{ id: 'valid_id', name: 'valid_name', color: 'valid_color' }],
        drivers: [{ user: 'valid_user', isRegistered: true, isRemoved: false }],
        pendentDrivers: [],
        admins: [],
        scoringSystem: { 1: 25 }
      }
    })

    expect(createScoringSystemSpy).toHaveBeenCalledWith({
      dto: {
        championship: validChampionship.id,
        scoringSystem: { 1: 25 }
      },
      session
    })
    expect(createScoringSystemSpy).toHaveReturned()
    expect(result.scoringSystem).toBe('valid_scoring_system')
  })

  it('should call helper createRaces method with correct values', async () => {
    const { sut, championshipServiceHelperStub, championshipRepositoryStub } =
      makeSut()

    const createRacesSpy = jest.spyOn(
      championshipServiceHelperStub,
      'createRaces'
    )

    jest
      .spyOn(championshipRepositoryStub, 'getOne')
      .mockReturnValueOnce(Promise.resolve(null))

    const result = await sut.create({
      id: validChampionship.id,
      dto: {
        description: 'valid_description',
        name: 'valid_name',
        platform: 'valid_platform',
        avatarImageUrl: 'valid_url',
        races: [
          { track: 'valid_track', startDate: 'valid_start_date' },
          { track: 'valid_track', startDate: 'valid_start_date' },
          { track: 'valid_track', startDate: 'valid_start_date' }
        ],
        teams: [{ id: 'valid_id', name: 'valid_name', color: 'valid_color' }],
        drivers: [{ user: 'valid_user', isRegistered: true, isRemoved: false }],
        pendentDrivers: [],
        admins: [],
        scoringSystem: { 1: 25 }
      }
    })

    expect(createRacesSpy).toHaveBeenCalledWith({
      championship: validChampionship.id,
      races: [
        { track: 'valid_track', startDate: 'valid_start_date' },
        { track: 'valid_track', startDate: 'valid_start_date' },
        { track: 'valid_track', startDate: 'valid_start_date' }
      ],
      session
    })
    expect(createRacesSpy).toHaveReturned()
    expect(result.races).toStrictEqual(['valid_race'])
  })

  it('should call helper createDriversAndTeams method with correct values', async () => {
    const { sut, championshipServiceHelperStub, championshipRepositoryStub } =
      makeSut()

    const createDriversAndTeamsSpy = jest.spyOn(
      championshipServiceHelperStub,
      'createDriversAndTeams'
    )

    jest
      .spyOn(championshipRepositoryStub, 'getOne')
      .mockReturnValueOnce(Promise.resolve(null))

    const result = await sut.create({
      id: validChampionship.id,
      dto: {
        description: 'valid_description',
        name: 'valid_name',
        platform: 'valid_platform',
        avatarImageUrl: 'valid_url',
        races: [{ track: 'valid_track', startDate: 'valid_start_date' }],
        teams: [{ id: 'valid_id', name: 'valid_name', color: 'valid_color' }],
        drivers: [{ user: 'valid_user', isRegistered: true, isRemoved: false }],
        pendentDrivers: [],
        admins: [],
        scoringSystem: { 1: 25 }
      }
    })

    expect(createDriversAndTeamsSpy).toHaveBeenCalledWith({
      championship: validChampionship.id,
      teams: [{ id: 'valid_id', name: 'valid_name', color: 'valid_color' }],
      drivers: [{ user: 'valid_user', isRegistered: true, isRemoved: false }],
      session
    })
    expect(result.teams).toStrictEqual(['valid_team'])
    expect(result.drivers).toStrictEqual([
      {
        user: 'valid_user',
        isRegistered: true,
        isRemoved: false,
        penalties: [],
        bonifications: []
      }
    ])
  })

  it('should call S3 Repository if a avatar image is provided on creation', async () => {
    const { sut, s3RepositoryStub, championshipRepositoryStub } = makeSut()

    const uploadImageSpy = jest.spyOn(s3RepositoryStub, 'uploadImage')

    const dto = {
      id: validChampionship.id,
      dto: {
        description: 'valid_description',
        name: 'valid_name',
        platform: 'valid_platform',
        avatarImageUrl: 'valid_url',
        races: [{ track: 'valid_track', startDate: 'valid_start_date' }],
        teams: [{ id: 'valid_id', name: 'valid_name', color: 'valid_color' }],
        drivers: [{ user: 'valid_user', isRegistered: true, isRemoved: false }],
        pendentDrivers: [],
        admins: [],
        scoringSystem: { 1: 25 },
        avatarImage: 'avatar_image'
      }
    }

    jest
      .spyOn(championshipRepositoryStub, 'getOne')
      .mockReturnValueOnce(Promise.resolve(null))

    await sut.create(dto as any)

    expect(uploadImageSpy).toHaveBeenCalledWith({
      file: 'avatar_image',
      fileName: validChampionship.id,
      folderName: 'championship-images'
    })
  })

  it('should get a Championship by ID', async () => {
    const { sut } = makeSut()

    jest.setTimeout(10000)

    const result = await sut.getOne({ id: 'valid_id' })

    expect(result).toStrictEqual(validChampionship)
  })

  it('should get Championships by Driver', async () => {
    const { sut } = makeSut()

    const result = await sut.getAll({ driver: 'valid_user' })

    expect(result).toStrictEqual([validChampionship])
  })

  it('should get Championships by Admin', async () => {
    const { sut } = makeSut()

    const result = await sut.getAll({ admin: 'valid_user' })

    expect(result).toStrictEqual([validChampionship])
  })

  it('should get Championships by Name or Code', async () => {
    const { sut } = makeSut()

    const result = await sut.getAll({ nameOrCode: 'valid_name_or_code' })

    expect(result).toStrictEqual([validChampionship])
  })
})
