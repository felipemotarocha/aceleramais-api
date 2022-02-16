import { model, Schema, Types } from 'mongoose'

const teamSchema = new Schema(
  {
    championship: {
      type: Types.ObjectId,
      ref: 'Championship',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: false
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

const TeamModel = model('Team', teamSchema)

export default TeamModel
