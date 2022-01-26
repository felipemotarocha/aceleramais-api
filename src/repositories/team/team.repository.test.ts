import { Types } from 'mongoose'

import { env } from '../../config/env.config'
import { CreateTeamDto } from '../../dtos/team.dtos'
import Team from '../../entities/team.entity'
import MongooseHelper from '../../helpers/mongoose.helpers'
import TeamModel from '../../models/team.model'
import { MongoTeamRepository } from './team.repository'

describe('Mongo Team Repository', () => {
  const validTeam: Team = {
    id: new Types.ObjectId() as any,
    championship: new Types.ObjectId() as any,
    name: 'Mercedes',
    color: '#fff'
  }

  beforeAll(async () => {
    await MongooseHelper.connect(env.mongodbUrl)
  })

  beforeEach(async () => {
    await TeamModel.deleteMany({})
  })

  afterAll(async () => {
    await MongooseHelper.disconnect()
  })

  const makeSut = () => new MongoTeamRepository(TeamModel)

  it('should create a Team', async () => {
    const sut = makeSut()

    const dto: CreateTeamDto = {
      championship: new Types.ObjectId() as any,
      name: 'Mercedes',
      color: '#fff'
    }

    const result = await sut.create(dto)

    expect(result.id).toBeTruthy()
    expect(result.championship).toStrictEqual(dto.championship)
    expect(result.name).toBe(dto.name)
    expect(result.color).toBe(dto.color)
  })

  it('should call TeamModel create method with correct values', async () => {
    const sut = makeSut()

    const createCollectionSpy = jest.spyOn(TeamModel, 'create')

    const dto: CreateTeamDto = {
      championship: new Types.ObjectId() as any,
      name: 'Mercedes',
      color: '#fff'
    }

    await sut.create(dto)

    expect(createCollectionSpy).toHaveBeenCalledWith(dto)
  })

  it('should get all Teams by Championship', async () => {
    const sut = makeSut()

    await TeamModel.create(validTeam)

    const result = await sut.getAll(validTeam.championship)

    expect(result[0].id).toBeTruthy()
    expect(result[0].championship).toStrictEqual(validTeam.championship)
    expect(result[0].name).toBe(validTeam.name)
    expect(result[0].color).toBe(validTeam.color)
  })
})
