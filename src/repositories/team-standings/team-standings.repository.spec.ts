import { Types } from 'mongoose'
import { env } from '../../config/env.config'
import {
  CreateTeamStandingsDto,
  UpdateTeamStandingsDto
} from '../../dtos/team-standings.dto'
import Team from '../../entities/team.entity'
import MongooseHelper from '../../helpers/mongoose.helpers'
import TeamStandingsModel from '../../models/team-standings.model'
import TeamModel from '../../models/team.model'
import { MongoTeamStandingsRepository } from './team-standings.repository'

describe('Mongo Team Standings Repository', () => {
  const validTeam: Team = {
    id: new Types.ObjectId() as any,
    championship: new Types.ObjectId() as any,
    name: 'Mercedes',
    color: '#fff'
  }

  const validTeamStandings = {
    id: new Types.ObjectId() as any,
    championship: new Types.ObjectId() as any,
    standings: [
      {
        team: validTeam.id,
        position: 1,
        points: 10
      }
    ]
  }

  beforeAll(async () => {
    await MongooseHelper.connect(env.mongodbUrl)
  })

  beforeEach(async () => {
    await TeamStandingsModel.deleteMany({})
    await TeamModel.deleteMany({})

    await TeamModel.create({ _id: validTeam.id, ...validTeam })
  })

  afterAll(async () => {
    await MongooseHelper.disconnect()
  })

  const makeSut = () => new MongoTeamStandingsRepository(TeamStandingsModel)

  it('should create a Team Standings', async () => {
    const sut = makeSut()

    const dto: CreateTeamStandingsDto = {
      championship: new Types.ObjectId() as any,
      standings: [
        {
          team: validTeam.id,
          position: 1,
          points: 10
        }
      ]
    }

    const result = await sut.create({ dto })

    expect(result.id).toBeTruthy()
    expect(result.championship).toStrictEqual(dto.championship)
    expect(result.standings[0].team).toStrictEqual(validTeam.id)
    expect(result.standings[0].position).toBe(dto.standings[0].position)
  })

  it('should call TeamStandingsModel create method with correct values', async () => {
    const sut = makeSut()

    const createTeamStandingsSpy = jest.spyOn(TeamStandingsModel, 'create')

    const dto: CreateTeamStandingsDto = {
      championship: new Types.ObjectId() as any,
      standings: [
        {
          team: validTeam.id,
          position: 1,
          points: 10
        }
      ]
    }

    await sut.create({ dto })

    expect(createTeamStandingsSpy).toHaveBeenCalledWith([dto], {
      session: undefined
    })
  })

  it('should get a Team Standings by Championship', async () => {
    const sut = makeSut()

    await TeamStandingsModel.create({
      _id: validTeamStandings.id,
      ...validTeamStandings
    })

    const result = await sut.getOne({
      championship: validTeamStandings.championship as any
    })

    expect(result.id).toBeTruthy()
    expect(result.championship).toStrictEqual(validTeamStandings.championship)
    expect(result.standings[0].team).toStrictEqual({
      id: (validTeam.id as any).toHexString(),
      name: validTeam.name,
      color: validTeam.color
    })
    expect(result.standings[0].position).toBe(
      validTeamStandings.standings[0].position
    )
    expect(result.standings[0].points).toBe(
      validTeamStandings.standings[0].points
    )
  })

  it('should call TeamStandingsModel getOne method with correct values', async () => {
    const sut = makeSut()

    await TeamStandingsModel.create({
      _id: validTeamStandings.id,
      ...validTeamStandings
    })

    const getOneTeamStandingsSpy = jest.spyOn(TeamStandingsModel, 'findOne')

    await sut.getOne({
      championship: validTeamStandings.championship as any
    })

    expect(getOneTeamStandingsSpy).toHaveBeenCalledWith({
      championship: validTeamStandings.championship as any
    })
  })

  it('should update a Team Standings', async () => {
    const sut = makeSut()

    await TeamStandingsModel.create([
      { _id: validTeamStandings.id, ...validTeamStandings }
    ])

    const dto: UpdateTeamStandingsDto = {
      standings: [
        {
          team: validTeam.id,
          position: 1,
          points: 10
        }
      ]
    }

    const result = await sut.update(validTeamStandings.id.toHexString(), dto)

    expect(result.id).toBeTruthy()
    expect(result.standings).toStrictEqual([
      {
        team: {
          id: (validTeam.id as any).toHexString(),
          name: validTeam.name,
          color: validTeam.color
        },
        position: 1,
        points: 10
      }
    ])
  })

  it('should call TeamStandingsModel findByIdAndUpdate method with correct values', async () => {
    const sut = makeSut()

    const updateTeamStandingsSpy = jest.spyOn(
      TeamStandingsModel,
      'findByIdAndUpdate'
    )

    await TeamStandingsModel.create([
      { _id: validTeamStandings.id, ...validTeamStandings }
    ])

    const dto: UpdateTeamStandingsDto = {
      standings: [
        {
          team: validTeam.id,
          position: 1,
          points: 10
        }
      ]
    }

    await sut.update(validTeamStandings.id.toHexString(), dto)

    expect(updateTeamStandingsSpy).toHaveBeenCalledWith(
      validTeamStandings.id.toHexString(),
      dto,
      { new: true }
    )
  })
})
