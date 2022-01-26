import { Types } from 'mongoose'

import { env } from '../../config/env.config'
import { CreateTeamDto, UpdateTeamDto } from '../../dtos/team.dtos'
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

  it('should update a Team', async () => {
    const sut = makeSut()

    await TeamModel.create({ _id: validTeam.id, ...validTeam })

    const dto: UpdateTeamDto = {
      name: 'Red Bull',
      color: '#fff'
    }

    const result = await sut.update(validTeam.id, { name: 'Red Bull' })

    expect(result.id).toBeTruthy()
    expect(result.championship).toStrictEqual(validTeam.championship)
    expect(result.name).toBe(dto.name)
    expect(result.color).toBe(dto.color)
  })

  it('should call TeamModel findByIdAndUpdate method with correct values', async () => {
    const sut = makeSut()

    const updateCollectionSpy = jest.spyOn(TeamModel, 'findByIdAndUpdate')

    await TeamModel.create({ _id: validTeam.id, ...validTeam })

    const dto: UpdateTeamDto = {
      name: 'Red Bull',
      color: '#fff'
    }

    await sut.update(validTeam.id, dto)

    expect(updateCollectionSpy).toHaveBeenCalledWith(validTeam.id, dto, {
      new: true
    })
  })

  it('should delete a Team', async () => {
    const sut = makeSut()

    await TeamModel.create({ _id: validTeam.id, ...validTeam })

    const result = await sut.delete(validTeam.id)

    expect(result.id).toBeTruthy()
    expect(result.championship).toStrictEqual(validTeam.championship)
    expect(result.name).toBe(validTeam.name)
    expect(result.color).toBe(validTeam.color)
  })

  it('should call TeamModel findByIdAndDelete method with correct values', async () => {
    const sut = makeSut()

    const updateCollectionSpy = jest.spyOn(TeamModel, 'findByIdAndDelete')

    await TeamModel.create({ _id: validTeam.id, ...validTeam })

    await sut.delete(validTeam.id)

    expect(updateCollectionSpy).toHaveBeenCalledWith(validTeam.id)
  })
})
