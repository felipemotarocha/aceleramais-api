import { model, Schema, Types } from 'mongoose'

const scoringSystemSchema = new Schema(
  {
    championship: {
      type: Types.ObjectId,
      ref: 'Championship'
    },
    scoringSystem: {
      type: Map,
      of: Number
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

const ScoringSystemModel = model('ScoringSystem', scoringSystemSchema)

export default ScoringSystemModel
