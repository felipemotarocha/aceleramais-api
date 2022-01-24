import { model, Schema, Types } from 'mongoose'

const scoringSystemSchema = new Schema({
  championship: {
    type: Types.ObjectId,
    ref: 'Championship'
  },
  scoringSystem: {
    type: Map,
    of: Number
  }
})

const ScoringSystemModel = model('ScoringSystem', scoringSystemSchema)

export default ScoringSystemModel
