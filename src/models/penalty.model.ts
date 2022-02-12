import { model, Schema, Types } from 'mongoose'

const penaltySchema = new Schema({
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

const PenaltyModel = model('Penalty', penaltySchema)

export default PenaltyModel
