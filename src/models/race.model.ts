import { model, Schema } from 'mongoose'

const raceSchema = new Schema(
  {
    championship: {
      ref: 'Championship',
      type: Schema.Types.ObjectId,
      required: true
    },
    track: {
      ref: 'Track',
      type: Schema.Types.ObjectId,
      required: true,
      autopopulate: true
    },
    startDate: {
      type: String,
      required: true
    },
    isCompleted: {
      type: Boolean,
      default: false
    },
    classification: {
      type: Schema.Types.ObjectId,
      ref: 'RaceClassification'
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

raceSchema.plugin(require('mongoose-autopopulate'))

const RaceModel = model('Race', raceSchema)

export default RaceModel
