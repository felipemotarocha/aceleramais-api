import { model, Schema, Types } from 'mongoose'

const bonificationSchema = new Schema({
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
})

const BonificationModel = model('Bonification', bonificationSchema)

export default BonificationModel
