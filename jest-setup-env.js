jest.mock('firebase-admin', () => ({
  credential: {
    applicationDefault: jest.fn()
  },
  initializeApp: () => ({
    auth: () => ({
      verifyIdToken: () =>
        Promise.resolve({
          uid: '123'
        })
    })
  })
}))
