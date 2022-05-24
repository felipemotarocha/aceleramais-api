jest.mock('firebase-admin', () => ({
  credential: {
    applicationDefault: jest.fn()
  },
  initializeApp: () => ({
    auth: () => ({
      verifyIdToken: () =>
        Promise.resolve({
          uid: '6UrOYyinh9TJg9M6n1t5mSJzQPu2'
        })
    })
  })
}))
