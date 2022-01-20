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
