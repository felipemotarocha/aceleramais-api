import { model, Schema } from 'mongoose'

const trackSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  countryCode: {
    type: String,
    required: true
  },
  countryName: {
    type: String,
    required: true
  }
})

const TrackModel = model('Track', trackSchema)

export default TrackModel
