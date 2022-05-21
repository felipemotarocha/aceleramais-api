import { Request, Response, NextFunction } from 'express'
import cache from '../../config/cache.config'
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
    const cachedDecodedToken = cache.get(authToken)

    if (cachedDecodedToken) {
      // @ts-ignore
      req.user = cachedDecodedToken.uid

      return next()
    }

    const decodedToken = await firebaseAuth.verifyIdToken(authToken!)

    cache.set(authToken, decodedToken.uid, 1800)

    // @ts-ignore
    req.user = decodedToken.uid

    next()
  } catch (error) {
    console.error(error)

    return res.status(401).send({ message: 'Unauthorized.' })
  }
}

export default auth
