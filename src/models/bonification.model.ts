import { model, Schema, Types } from 'mongoose'

const bonificationSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    points: {
      type: Number,
      required: true
    },
    championship: {
      type: Types.ObjectId,
      ref: 'Championship'
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

const BonificationModel = model('Bonification', bonificationSchema)

export default BonificationModel
