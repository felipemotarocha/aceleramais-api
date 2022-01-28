import { model, Schema, Types } from 'mongoose'

const driversSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: 'User',
      required: false
    },
    userName: {
      type: String,
      required: false
    },
    team: {
      type: Types.ObjectId,
      ref: 'Team',
      required: false
    },
    isRegistered: {
      type: Boolean,
      required: true
    }
  },
  { _id: false }
)

const championshipSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  avatarImageUrl: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: true
  },
  platform: {
    type: String,
    required: true
  },
  races: {
    type: [Types.ObjectId],
    ref: 'Race',
    required: true
  },
  drivers: {
    type: [driversSchema],
    required: false
  },
  teams: {
    type: [Types.ObjectId],
    ref: 'Team',
    required: true
  },
  driverStandings: {
    type: Types.ObjectId,
    ref: 'DriverStandings',
    required: true
  },
  teamStandings: {
    type: Types.ObjectId,
    required: true,
    ref: 'TeamStandings'
  },
  scoringSystem: {
    type: Types.ObjectId,
    ref: 'ScoringSystem',
    required: true
  }
})

const ChampionshipModel = model('Championship', championshipSchema)

export default ChampionshipModel
