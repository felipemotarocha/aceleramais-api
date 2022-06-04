import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const generateConfig = () => {
  if (process.env.NODE_ENV === 'production') {
    return {
      apiKey: 'AIzaSyDL4qI8LKb7-MQCWpf8BYmtP41QPxZCBoY',
      authDomain: 'aceleramais-production-352314.firebaseapp.com',
      projectId: 'aceleramais-production-352314',
      storageBucket: 'aceleramais-production-352314.appspot.com',
      messagingSenderId: '116952032771',
      appId: '1:116952032771:web:26aebe149f5b80cba41036',
      measurementId: 'G-CEX5Q2QXHG'
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
