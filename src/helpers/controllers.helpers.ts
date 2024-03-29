import {
  NotFoundError,
  ServerError,
  UnauthorizedError
} from '../errors/controllers.errors'
import { HttpResponse } from '../protocols/controllers.protocols'

export const ok = (data: any): HttpResponse => {
  return {
    statusCode: 200,
    body: data
  }
}

export const created = (data: any): HttpResponse => {
  return {
    statusCode: 201,
    body: data
  }
}

export const badRequest = (error: Error): HttpResponse => {
  return {
    statusCode: 400,
    body: error
  }
}

export const unauthorized = (): HttpResponse => {
  return {
    statusCode: 401,
    body: new UnauthorizedError()
  }
}

export const notFound = (): HttpResponse => {
  return {
    statusCode: 404,
    body: new NotFoundError()
  }
}

export const serverError = (): HttpResponse => {
  return {
    statusCode: 500,
    body: new ServerError()
  }
}
