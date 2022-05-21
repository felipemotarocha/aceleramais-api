import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const generateConfig = () => {
  if (process.env.NODE_ENV === 'production') {
    return {
      apiKey: 'AIzaSyCjWamIffDjvLSoFoY6jR9Py4dMrjB5yc0',
      authDomain: 'aceleramais-94101.firebaseapp.com',
      projectId: 'aceleramais-94101',
      storageBucket: 'aceleramais-94101.appspot.com',
      messagingSenderId: '20063332770',
      appId: '1:20063332770:web:69413a2b31199c3cf26afb',
      measurementId: 'G-CMMHHVG5ST'
    }
  }

  return {
    apiKey: 'AIzaSyCiPCh7T7RO9HwljOsPAOw8sczypuhc7qU',
    authDomain: 'aceleramais-development.firebaseapp.com',
    projectId: 'aceleramais-development',
    storageBucket: 'aceleramais-development.appspot.com',
    messagingSenderId: '878035662808',
    appId: '1:878035662808:web:8be3b5e29d7876670b64ad'
  }
}

const app = initializeApp(generateConfig())

export const auth = getAuth()

export default app
