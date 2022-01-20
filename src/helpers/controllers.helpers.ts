import { HttpResponse } from '../protocols/controllers.protocols'

export const created = (data: any): HttpResponse => {
  return {
    status: 201,
    body: data
  }
}
