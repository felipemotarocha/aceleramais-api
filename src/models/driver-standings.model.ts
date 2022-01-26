import { model, Schema, Types } from 'mongoose'

const standingsSchema = new Schema(
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
    position: {
      type: Number,
      required: true
    },
    isRegistered: {
      type: Boolean,
      required: true
    }
  },
  { _id: false }
)

const driverStandingsSchema = new Schema({
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

const DriverStandingsModel = model('DriverStandings', driverStandingsSchema)

export default DriverStandingsModel
