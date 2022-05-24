import { Request, Response } from 'express'

import { HttpResponse } from '../protocols/controllers.protocols'

type ControllerMethods = 'create' | 'getOne' | 'getAll' | 'update' | 'dete'

const adaptRoute = (controller: any, method: ControllerMethods) => {
  return async (req: Request, res: Response) => {
    const httpRequest = {
      body: req.body,
      params: req.params,
      query: req.query,
      file: req.file,
      user: (req as any).user
    }

    const httpResponse: HttpResponse = await controller[method](httpRequest)

    const isError = ![200, 201].includes(httpResponse.statusCode)

    if (isError) {
      return res
        .status(httpResponse.statusCode)
        .send({ message: httpResponse.body.message })
    }

    return res.status(httpResponse.statusCode).send(httpResponse.body)
  }
}

export default adaptRoute
