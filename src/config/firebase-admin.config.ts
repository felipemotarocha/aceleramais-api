import admin from 'firebase-admin'
import { env } from './env.config'

const app = admin.initializeApp({
  credential: admin.credential.cert({
    privateKey: env.firebasePrivateKey,
    clientEmail: env.firebaseClientEmail,
    projectId: env.firebaseProjectId
  })
})

export const auth = app.auth()

export default app
