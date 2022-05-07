import mongoose from 'mongoose'
import { ChampionshipServiceSutFactory, validChampionship } from '.'

describe('Championship Service', () => {
  const makeSut = ChampionshipServiceSutFactory.make

  it('should create the Championship Teams', async () => {
    const { sut, teamRepositoryStub, championshipRepositoryStub } = makeSut()

    const createTeamSpy = jest.spyOn(teamRepositoryStub, 'bulkCreate')

    jest
      .spyOn(championshipRepositoryStub, 'getOne')
      .mockReturnValueOnce(Promise.resolve(null))

    const result = await sut.create({
      id: validChampionship.id,
      createChampionshipDto: {
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

    expect(createTeamSpy).toHaveReturned()
    expect(result.teams).toStrictEqual(['valid_team'])
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
      createChampionshipDto: {
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
      championship: validChampionship.id,
      standings: []
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
      createChampionshipDto: {
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
      championship: validChampionship.id,
      standings: []
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
      createChampionshipDto: {
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
      }
    })
    expect(createScoringSystemSpy).toHaveReturned()
    expect(result.scoringSystem).toBe('valid_scoring_system')
  })

  it('should create the Championship Races', async () => {
    const { sut, raceRepositoryStub, championshipRepositoryStub } = makeSut()

    const createScoringSystemSpy = jest.spyOn(raceRepositoryStub, 'create')

    jest
      .spyOn(championshipRepositoryStub, 'getOne')
      .mockReturnValueOnce(Promise.resolve(null))

    const result = await sut.create({
      id: validChampionship.id,
      createChampionshipDto: {
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

    expect(createScoringSystemSpy).toHaveBeenCalledTimes(3)
    expect(createScoringSystemSpy).toHaveReturnedTimes(3)
    expect(result.races).toStrictEqual(['valid_race'])
  })

  it('should create the Championship Bonifications', async () => {
    const { sut, bonificationRepositoryStub, championshipRepositoryStub } =
      makeSut()

    const createBonificationsSpy = jest.spyOn(
      bonificationRepositoryStub,
      'bulkCreate'
    )

    jest
      .spyOn(championshipRepositoryStub, 'getOne')
      .mockReturnValueOnce(Promise.resolve(null))

    const result = await sut.create({
      id: validChampionship.id,
      createChampionshipDto: {
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
        scoringSystem: { 1: 25 },
        bonifications: [
          { name: 'Volta mais rápida', points: 1 },
          { name: 'Pole Position', points: 1 }
        ]
      }
    })

    expect(createBonificationsSpy).toHaveBeenCalledTimes(1)
    expect(createBonificationsSpy).toHaveReturnedTimes(1)
    expect(result.bonifications).toStrictEqual(['valid_bonification'])
  })

  it('should create the Championship Penalties', async () => {
    const { sut, penaltyRepositoryStub, championshipRepositoryStub } = makeSut()

    const createPenaltiesSpy = jest.spyOn(penaltyRepositoryStub, 'bulkCreate')

    jest
      .spyOn(championshipRepositoryStub, 'getOne')
      .mockReturnValueOnce(Promise.resolve(null))

    const result = await sut.create({
      id: validChampionship.id,
      createChampionshipDto: {
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
        scoringSystem: { 1: 25 },
        penalties: [{ name: 'Colisão', points: 1 }]
      }
    })

    expect(createPenaltiesSpy).toHaveBeenCalledTimes(1)
    expect(createPenaltiesSpy).toHaveReturnedTimes(1)
    expect(result.penalties).toStrictEqual(['valid_penalty'])
  })

  it('should call S3 Repository if a avatar image is provided on creation', async () => {
    const { sut, s3RepositoryStub, championshipRepositoryStub } = makeSut()

    const uploadImageSpy = jest.spyOn(s3RepositoryStub, 'uploadImage')

    const dto = {
      id: validChampionship.id,
      createChampionshipDto: {
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

  it('should create the Championship', async () => {
    const { sut, championshipRepositoryStub } = makeSut()

    jest
      .spyOn(championshipRepositoryStub, 'getOne')
      .mockReturnValueOnce(Promise.resolve(null))

    const result = await sut.create({
      id: validChampionship.id,
      createChampionshipDto: {
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

  // it('should create the bonifications and penalties', async () => {
  //   const { sut, bonificationRepositoryStub, penaltyRepositoryStub } = makeSut()

  //   const result = await sut.createDriversAndTeams({
  //     drives: validChampionship.drivers,
  //     teams: validChampionship.teams,
  //     championship: validChampionship.id
  //   })
  // })

  it('should update races', async () => {
    const { sut, raceRepositoryStub, raceClassificationRepositoryStub } =
      makeSut()

    const raceRepositoryBulkDeleteSpy = jest.spyOn(
      raceRepositoryStub,
      'bulkDelete'
    )
    const raceClassificationRepositoryBulkDeleteSpy = jest.spyOn(
      raceClassificationRepositoryStub,
      'bulkDelete'
    )
    const createRacesSpy = jest.spyOn(sut, 'createRaces' as any)

    await sut.updateRaces({
      championship: validChampionship.id,
      races: [
        {
          startDate: 'valid_start_date',
          track: 'valid_track',
          id: 'valid_race'
        },
        { startDate: 'valid_start_date', track: 'valid_track' }
      ]
    })

    expect(raceRepositoryBulkDeleteSpy).toHaveBeenCalledWith({
      ids: ['valid_id']
    })
    expect(raceClassificationRepositoryBulkDeleteSpy).toHaveBeenCalledWith({
      ids: ['valid_classification_id']
    })
    expect(createRacesSpy).toHaveBeenCalledWith({
      championship: validChampionship.id,
      races: [
        {
          id: 'valid_race',
          startDate: 'valid_start_date',
          track: 'valid_track'
        }
      ]
    })
  })

  it('should update a Championship', async () => {
    const { sut } = makeSut()

    const session = {
      startTransaction: jest.fn(),
      commitTransaction: jest.fn(),
      endSession: jest.fn()
    }

    jest.spyOn(mongoose, 'startSession').mockImplementationOnce(() => session)

    const prepareToUpdateSpy = jest.spyOn(sut, 'prepareToUpdate')
    const createDriversAndTeamsSpy = jest.spyOn(
      sut,
      'createDriversAndTeams' as any
    )
    const createPenaltiesAndBonificationsSpy = jest.spyOn(
      sut,
      'createPenaltiesAndBonifications' as any
    )
    const updateRacesSpy = jest.spyOn(sut, 'updateRaces' as any)

    const result = await sut.update(validChampionship.id, {
      bonifications: [
        { name: 'valid_bonification', points: 1, id: 'valid_id' }
      ],
      drivers: [
        { isRegistered: true, isRemoved: false, team: '1', user: 'valid_user' }
      ],
      penalties: [{ name: 'valid_penalty', points: 1, id: 'valid_id' }],
      teams: [{ id: '1', name: 'Mercedes', color: 'color' }],
      scoringSystem: { 1: 25 },
      races: [
        { startDate: 'valid_start_date', track: 'valid_track', id: 'valid_id' },
        { startDate: 'valid_start_date', track: 'valid_track' }
      ]
    })

    expect(prepareToUpdateSpy).toHaveBeenCalledWith(validChampionship, session)
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
        { startDate: 'valid_start_date', track: 'valid_track', id: 'valid_id' },
        { startDate: 'valid_start_date', track: 'valid_track' }
      ],
      session
    })

    expect(result).toStrictEqual(validChampionship)
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
