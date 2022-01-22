import { model, Schema, Types } from 'mongoose'

const classificationSchema = new Schema({
  position: {
    type: Number,
    required: true
  },
  user: {
    type: Types.ObjectId,
    // TODO: add User ref
    // ref: 'User',
    required: true
  },
  userName: {
    type: String,
    required: false
  },
  team: {
    type: Types.ObjectId,
    // TODO: add ChampionshipTeam ref
    // ref: 'ChampionshipTeam',
    required: true
  },
  isRegistered: {
    type: Boolean,
    required: true
  },

  hasFastestLap: {
    type: Boolean,
    required: true
  },
  hasPolePosition: {
    type: Boolean,
    required: true
  }
})

const raceClassificationSchema = new Schema({
  race: {
    type: Types.ObjectId,
    ref: 'Race',
    required: true
  },
  classification: {
    type: [classificationSchema],
    required: true
  }
})

const RaceClassificationModel = model(
  'RaceClassification',
  raceClassificationSchema
)

export default RaceClassificationModel
