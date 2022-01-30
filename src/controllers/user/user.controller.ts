import { MissingParamError } from '../../errors/controllers.errors'
import {
  badRequest,
  created,
  serverError
} from '../../helpers/controllers.helpers'
import {
  HttpRequest,
  HttpResponse
} from '../../protocols/controllers.protocols'
import { UserServiceAbstract } from '../../services/user/user.service'

export interface UserControllerAbstract {
  create(httpRequest: HttpRequest): Promise<HttpResponse>
  getOne(httpRequest: HttpRequest): Promise<HttpResponse>
  update(httpRequest: HttpRequest): Promise<HttpResponse>
}

export class UserController implements UserControllerAbstract {
  private readonly userService: UserServiceAbstract

  constructor(userService: UserServiceAbstract) {
    this.userService = userService
  }

  async create(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = [
        'id',
        'firstName',
        'lastName',
        'email',
        'provider',
        'userName'
      ]

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const team = await this.userService.create(httpRequest.body)

      return created(team)
    } catch (_) {
      return serverError()
    }
  }

  getOne(httpRequest: HttpRequest): Promise<HttpResponse> {
    throw new Error('Method not implemented.')
  }

  update(httpRequest: HttpRequest): Promise<HttpResponse> {
    throw new Error('Method not implemented.')
  }
}
