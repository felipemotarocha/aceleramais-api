jest.mock('firebase-admin', () => ({
  credential: {
    applicationDefault: jest.fn()
  },
  initializeApp: () => ({
    auth: () => ({
      verifyIdToken: () =>
        Promise.resolve({
          uid: 'VH96TwI5gmZHeWZR7STTlH9vzTl1'
        })
    })
  })
}))
