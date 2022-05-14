import { Express } from 'express'

export interface CreateUserDto {
  id: string
  email: string
  firstName: string
  lastName: string
  userName: string
  provider: string
  biography?: string
  profileImage?: Express.Multer.File
  profileImageUrl?: string
}

export interface UpdateUserDto {
  firstName?: string
  lastName?: string
  userName?: string
  biography?: string
  profileImage?: Express.Multer.File
}

export interface UpdateUserMongoDto {
  firstName?: string
  lastName?: string
  userName?: string
  biography?: string
  profileImageUrl?: string
}
