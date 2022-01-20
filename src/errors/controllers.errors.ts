export class MissingParamError extends Error {
  constructor(paramName: string) {
    super(`Missing ${paramName}`)
  }
}
