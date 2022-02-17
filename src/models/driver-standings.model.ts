import { model, Schema, Types } from 'mongoose'

const standingsSchema = new Schema(
  {
    user: {
      type: String,
      ref: 'User',
      required: false,
      autopopulate: {
        select: ['id', 'firstName', 'lastName', 'profileImageUrl', 'userName']
      }
    },
    id: {
      type: String,
      required: false
    },
    firstName: {
      type: String,
      required: false
    },
    lastName: {
      type: String,
      required: false
    },
    team: {
      type: Types.ObjectId,
      ref: 'Team',
      required: false,
      autopopulate: { select: ['id', 'name', 'color'] }
    },
    position: {
      type: Number,
      required: true
    },
    points: {
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

const driverStandingsSchema = new Schema(
  {
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
  },
  {
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (_doc, { _id, ...rest }) => rest
    },
    toObject: {
      virtuals: true,
      versionKey: false,
      transform: (_doc, { _id, ...rest }) => rest
    }
  }
)

driverStandingsSchema.plugin(require('mongoose-autopopulate'))

const DriverStandingsModel = model('DriverStandings', driverStandingsSchema)

export default DriverStandingsModel
