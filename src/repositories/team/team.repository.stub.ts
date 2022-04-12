import { Types } from 'mongoose'
import Team from '../../entities/team.entity'
import { TeamRepositoryAbstract } from './team.repository'

export const validTeam: Team = {
  id: new Types.ObjectId() as any,
  championship: new Types.ObjectId() as any,
  name: 'Mercedes',
  color: '#fff'
}

export class TeamRepositoryStub implements TeamRepositoryAbstract {
  async create(): Promise<Team> {
    return validTeam
  }

  async bulkCreate(): Promise<Team[]> {
    return [validTeam]
  }

  async getAll(): Promise<Team[]> {
    return [validTeam]
  }

  async update(): Promise<Team> {
    return validTeam
  }

  async delete(): Promise<Team> {
    return validTeam
  }

  async bulkDelete(): Promise<number> {
    return 1
  }
}
