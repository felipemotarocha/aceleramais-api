import { Express } from 'express'

export interface CreateChampionshipDto {
  name: string
  description?: string
  platform: string
  avatarImage?: Express.Multer.File
  avatarImageUrl?: string
  admins: {
    user: string
    isCreator: boolean
  }[]
  races: {
    startDate: string
    track: string
  }[]
  teams?: {
    id: string
    name: string
    color?: string
  }[]
  drivers?: {
    user?: string
    id?: string
    firstName?: string
    lastName?: string
    team?: string
    isRegistered: boolean
  }[]
  scoringSystem: {
    [key: string]: number
  }
  bonifications?: {
    name: string
    points: number
  }[]
  penalties?: {
    name: string
    points: number
  }[]
}

export interface CreateChampionshipMongoDto {
  _id?: string
  name: string
  description?: string
  platform: string
  avatarImageUrl?: string
  admins: {
    user: string
    isCreator: boolean
  }[]
  races: string[]
  teams?: string[]
  drivers?: {
    user?: string
    userName?: string
    team?: string
    isRegistered: boolean
  }[]
  scoringSystem: string
  driverStandings: string
  teamStandings: string
  bonifications?: string[]
  penalties?: string[]
}

export interface UpdateChampionshipDto {
  drivers: {
    user?: string
    userName?: string
    team?: string
    isRegistered: boolean
  }[]
  teams: {
    id: string
    name: string
    color?: string
  }[]
  bonifications: {
    race: string
    name: string
    points: number
  }[]
  penalties: {
    race: string
    name: string
    points: number
  }[]
  scoringSystem: {
    [key: string]: number
  }
}

export interface UpdateChampionshipMongoDto {
  drivers: {
    user?: string
    userName?: string
    team?: string
    isRegistered: boolean
  }[]
  scoringSystem: string
  teams: string[]
  bonifications: string[]
  penalties: string[]
}
