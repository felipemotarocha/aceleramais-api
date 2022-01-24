import { model, Schema, Types } from 'mongoose'

const standingsSchema = new Schema({
  team: {
    type: Types.ObjectId,
    ref: 'Team',
    required: true
  },
  position: {
    type: Number,
    required: true
  }
})

const teamStandingsSchema = new Schema({
  championship: {
    type: Types.ObjectId,
    ref: 'Championship',
    required: true
  },
  standings: {
    type: [standingsSchema],
    required: false,
    default: []
  }
})

const TeamStandingsModel = model('TeamStandings', teamStandingsSchema)

export default TeamStandingsModel
