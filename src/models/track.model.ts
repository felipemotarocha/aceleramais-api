import { model, Schema } from 'mongoose'

const trackSchema = new Schema(
  {
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
  },
  {
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (_doc, { _id, ...rest }) => rest
    },
    toObject: {
      virtuals: true,
      versionKey: false,
      transform: (_doc, { _id, ...rest }) => rest
    }
  }
)

const TrackModel = model('Track', trackSchema)

export default TrackModel
