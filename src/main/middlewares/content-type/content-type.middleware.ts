import { Request, Response, NextFunction } from 'express'

const contentType = (
  _req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.type('json')
  next()
}

export default contentType
