import { HttpResponse } from '../protocols/controllers.protocols'

export const created = (data: any): HttpResponse => {
  return {
    status: 201,
    body: data
  }
}

export const badRequest = (error: Error): HttpResponse => {
  return {
    status: 400,
    body: error
  }
}
