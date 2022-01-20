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

export class NotAllowedFieldsError extends Error {
  constructor() {
    super(
      'One or more of the received fields are not allowed in this operation.'
    )
  }
}
