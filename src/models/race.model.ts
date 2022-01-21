import { model, Schema } from 'mongoose'

const raceSchema = new Schema({
  championship: {
    ref: 'Championship',
    type: Schema.Types.ObjectId,
    required: true
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
})

const RaceModel = model('Race', raceSchema)

export default RaceModel
