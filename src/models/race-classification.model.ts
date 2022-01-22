import { model, Schema, Types } from 'mongoose'

const driverSchema = new Schema({
  user: {
    type: Types.ObjectId,
    // TODO: add User ref
    // ref: 'User',
    required: true
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
  }
})

const classificationSchema = new Schema({
  driver: {
    type: driverSchema,
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
