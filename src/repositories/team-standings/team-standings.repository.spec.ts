import { Types } from 'mongoose'
import { env } from '../../config/env.config'
import {
  CreateTeamStandingsDto,
  UpdateTeamStandingsDto
} from '../../dtos/team-standings.dto'
import MongooseHelper from '../../helpers/mongoose.helpers'
import TeamStandingsModel from '../../models/team-standings.model'
import { MongoTeamStandingsRepository } from './team-standings.repository'

describe('Mongo Team Standings Repository', () => {
  const validTeamStandings = {
    id: new Types.ObjectId() as any,
    championship: new Types.ObjectId() as any,
    standings: [
      {
        team: new Types.ObjectId() as any,
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
  })

  afterAll(async () => {
    await MongooseHelper.disconnect()
  })

  const makeSut = () => new MongoTeamStandingsRepository(TeamStandingsModel)

  it('should create a Scoring System', async () => {
    const sut = makeSut()

    const dto: CreateTeamStandingsDto = {
      championship: new Types.ObjectId() as any,
      standings: [
        {
          team: new Types.ObjectId() as any,
          position: 1,
          points: 10
        }
      ]
    }

    const result = await sut.create(dto)

    expect(result.id).toBeTruthy()
    expect(result.championship).toStrictEqual(dto.championship)
    expect(result.standings[0].team).toStrictEqual(dto.standings[0].team)
    expect(result.standings[0].position).toBe(dto.standings[0].position)
  })

  it('should call TeamStandingsModel create method with correct values', async () => {
    const sut = makeSut()

    const createTeamStandingsSpy = jest.spyOn(TeamStandingsModel, 'create')

    const dto: CreateTeamStandingsDto = {
      championship: new Types.ObjectId() as any,
      standings: [
        {
          team: new Types.ObjectId() as any,
          position: 1,
          points: 10
        }
      ]
    }

    await sut.create(dto)

    expect(createTeamStandingsSpy).toHaveBeenCalledWith(dto)
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
    expect(result.standings[0].team).toStrictEqual(
      validTeamStandings.standings[0].team
    )
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
          team: new Types.ObjectId() as any,
          position: 1,
          points: 10
        }
      ]
    }

    const result = await sut.update(validTeamStandings.id.toHexString(), dto)

    expect(result.id).toBeTruthy()
    expect(result.standings).toStrictEqual(dto.standings)
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
          team: new Types.ObjectId() as any,
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
