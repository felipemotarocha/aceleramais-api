import { ClientSession } from 'mongoose'

export interface BaseRepositoryParams {
  session?: ClientSession
}
