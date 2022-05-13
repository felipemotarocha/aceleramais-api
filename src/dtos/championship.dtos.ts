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
  pendentDrivers?: {
    user: string
    team?: string
  }[]
  drivers?: {
    user?: string
    id?: string
    firstName?: string
    lastName?: string
    team?: string
    isRegistered: boolean
    isRemoved: boolean
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
  code: string
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
  pendentDrivers: {
    user: string
    team?: string
  }[]
  drivers?: {
    user?: string
    userName?: string
    team?: string
    isRegistered: boolean
    isRemoved: boolean
  }[]
  scoringSystem: string
  driverStandings: string
  teamStandings: string
  bonifications?: string[]
  penalties?: string[]
}

export interface UpdateChampionshipDto {
  name?: string
  description?: string
  platform?: string
  races?: {
    id?: string
    startDate: string
    track: string
  }[]
  drivers: {
    user?: string
    userName?: string
    team?: string
    isRegistered: boolean
    isRemoved: boolean
    bonifications?: { bonification: string; race: string }[]
    penalties?: { penalty: string; race: string }[]
  }[]
  pendentDrivers?: {
    user: string
    team?: string
  }[]
  teams: {
    id: string
    name: string
    color?: string
  }[]
  bonifications: {
    id: string
    name: string
    points: number
  }[]
  penalties: {
    id: string
    name: string
    points: number
  }[]
  scoringSystem: {
    [key: string]: number
  }
  avatarImage?: Express.Multer.File
  avatarImageUrl?: string
}

export interface UpdateChampionshipMongoDto {
  name?: string
  description?: string
  platform?: string
  drivers: {
    user?: string
    userName?: string
    team?: string
    isRegistered: boolean
    isRemoved: boolean
  }[]
  pendentDrivers?: {
    user: string
    team?: string
  }[]
  races?: string[]
  scoringSystem: string
  teams: string[]
  bonifications: string[]
  penalties: string[]
  avatarImageUrl?: string
}
