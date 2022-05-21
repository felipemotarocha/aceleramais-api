import { Request, Response, NextFunction } from 'express'
import { auth as firebaseAuth } from '../../config/firebase-admin.config'

const auth = async (req: Request, res: Response, next: NextFunction) => {
  if (req.url === '/api/user/login') {
    return next()
  }

  const authToken = req.headers?.authorization?.split(' ')?.[1]

  if (!authToken) {
    return res.status(401).json({ message: 'Unauthorized.' })
  }

  try {
    const decodedToken = await firebaseAuth.verifyIdToken(authToken!)

    // @ts-ignore
    req.user = decodedToken.uid

    next()
  } catch (error) {
    console.error(error)

    return res.status(401).send({ message: 'Unauthorized.' })
  }
}

export default auth
