import { Express } from 'express'

export interface HttpRequest {
  body?: any
  params?: { [key: string]: string }
  query?: { [key: string]: string }
  file?: Express.Multer.File
  user?: string
}

export interface HttpResponse {
  statusCode: number
  body: any
}
