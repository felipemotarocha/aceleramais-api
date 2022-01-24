import { model, Schema, Types } from 'mongoose'

const driversSchema = new Schema({
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
  isRegisterd: {
    type: Boolean,
    required: true
  }
})

const championshipSchema = new Schema({
  name: {
    type: String,
    required: true
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
    required: false
  },
  driverStandings: {
    type: Types.ObjectId,
    ref: 'DriverStandings',
    required: false
  },
  teamStandings: {
    type: Types.ObjectId,
    required: false,
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
