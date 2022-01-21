import mongoose from 'mongoose'

const MongooseHelper = {
  async connect(uri: string) {
    return await mongoose.connect(uri)
  },

  async disconnect() {
    return await mongoose.disconnect()
  },

  map<T>(collection: any): T {
    const { _id, ...collectionWithoutId } = collection

    return {
      id: _id,
      ...collectionWithoutId
    }
  }
}

export default MongooseHelper
