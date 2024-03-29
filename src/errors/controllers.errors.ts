export class MissingParamError extends Error {
  constructor(paramName: string) {
    super(`Missing ${paramName}`)
  }
}

export class ServerError extends Error {
  constructor() {
    super('Something went wrong. Please, try again later.')
  }
}

export class NotFoundError extends Error {
  constructor() {
    super('No register with the provided params were found.')
  }
}

export class NotAllowedFieldsError extends Error {
  constructor() {
    super(
      'One or more of the received fields are not allowed in this operation.'
    )
  }
}

export class InvalidFieldError extends Error {
  constructor(field: string) {
    super(`The ${field} is invalid.`)
  }
}

export class UnauthorizedError extends Error {
  constructor() {
    super('Unauthorized.')
  }
}
