import admin from 'firebase-admin'

const app = admin.initializeApp({
  credential: admin.credential.applicationDefault()
})

export const auth = app.auth()

export default app
