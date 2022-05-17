import {
  MissingParamError,
  NotAllowedFieldsError
} from '../../errors/controllers.errors'
import {
  badRequest,
  created,
  notFound,
  ok,
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
  getAll(httpRequest: HttpRequest): Promise<HttpResponse>
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

      if (httpRequest.body?.profileImage && httpRequest.body?.profileImageUrl) {
        return badRequest(new NotAllowedFieldsError())
      }

      const user = await this.userService.create({
        ...httpRequest.body,
        profileImage: httpRequest.file
      })

      return created(user)
    } catch (err) {
      return serverError()
    }
  }

  async getOne(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.query) {
        return badRequest(new MissingParamError('query'))
      }

      if (!httpRequest.query?.id && !httpRequest.query?.userName) {
        return badRequest(new MissingParamError('id/userName'))
      }

      const user = await this.userService.getOne({
        id: httpRequest.query.id,
        userName: httpRequest.query.userName
      })

      if (!user) return notFound()

      return ok(user)
    } catch (_) {
      return serverError()
    }
  }

  async update(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.params) {
        return badRequest(new MissingParamError('params'))
      }

      if (!httpRequest.params?.id) {
        return badRequest(new MissingParamError('id'))
      }

      const allowedUpdates = ['firstName', 'lastName', 'userName', 'biography']

      const someReceivedUpdateIsNotAllowed = Object.keys(httpRequest.body).some(
        (update) => !allowedUpdates.includes(update)
      )

      if (someReceivedUpdateIsNotAllowed) {
        return badRequest(new NotAllowedFieldsError())
      }

      const user = await this.userService.update(httpRequest.params.id, {
        ...httpRequest.body,
        profileImage: httpRequest.file
      })

      return ok(user)
    } catch (_) {
      return serverError()
    }
  }

  async getAll(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.query) {
        return badRequest(new MissingParamError('query'))
      }

      if (!httpRequest.query?.userName) {
        return badRequest(new MissingParamError('id/userName'))
      }

      const user = await this.userService.getAll({
        userName: httpRequest.query.userName
      })

      return ok(user)
    } catch (_) {
      return serverError()
    }
  }
}
