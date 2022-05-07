import { ClientSession } from 'mongoose'
import {
  CreateChampionshipDto,
  UpdateChampionshipDto
} from '../../dtos/championship.dtos'
import Bonification from '../../entities/bonification.entity'
import Championship from '../../entities/championship.entity'
import Penalty from '../../entities/penalty.entity'
import Race from '../../entities/race.entity'
import Team from '../../entities/team.entity'
import User from '../../entities/user.entity'

export interface PrepareToUpdateParams {
  championship: Championship
  session?: ClientSession
}

export interface UpdateRacesParams {
  championship: string
  races: UpdateChampionshipDto['races']
  session?: ClientSession
}

export interface CreatePenaltiesAndBonificationsParams {
  championship: string
  penalties: CreateChampionshipDto['penalties']
  bonifications: CreateChampionshipDto['bonifications']
  session?: ClientSession
}

export interface CreateDriversAndTeamsParams {
  championship: string
  drivers: CreateChampionshipDto['drivers']
  teams: CreateChampionshipDto['teams']
  session?: ClientSession
}

export interface ChampionshipServiceHelperAbstract {
  prepareToUpdate(params: PrepareToUpdateParams): Promise<void>
  updateRaces(params: UpdateRacesParams): Promise<Race[]>
  createPenaltiesAndBonifications(
    params: CreatePenaltiesAndBonificationsParams
  ): Promise<{
    penalties: Penalty[]
    bonifications: Bonification[]
  }>
  createDriversAndTeams(
    params: CreateDriversAndTeamsParams
  ): Promise<{ drivers: User[]; teams: Team[] }>
}
