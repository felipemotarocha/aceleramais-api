import { Express } from 'express'

export interface CreateChampionshipDto {
  name: string
  description: string
  platform: string
  avatarImage?: Express.Multer.File
  avatarImageUrl?: string
  races: {
    startDate: string
    track: string
  }[]
  teams?: {
    name: string
    color?: string
  }[]
  drivers?: {
    user?: string
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
  description: string
  platform: string
  avatarImageUrl?: string
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
