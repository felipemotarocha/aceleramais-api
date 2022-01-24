import { model, Schema, Types } from 'mongoose'

const teamSchema = new Schema({
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
})

const TeamModel = model('Team', teamSchema)

export default TeamModel
