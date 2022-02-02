import { Express } from 'express'

export interface CreateUserDto {
  id: string
  email: string
  firstName: string
  lastName: string
  userName: string
  provider: string
  profileImage?: Express.Multer.File
  profileImageUrl?: string
}

export interface UpdateUserDto {
  firstName?: string
  lastName?: string
  userName?: string
}
