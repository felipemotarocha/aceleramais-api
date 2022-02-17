import { model, Schema, Types } from 'mongoose'

const standingsSchema = new Schema(
  {
    team: {
      type: Types.ObjectId,
      ref: 'Team',
      required: true,
      autopopulate: { select: ['id', 'name', 'color'] }
    },
    position: {
      type: Number,
      required: true
    },
    points: {
      type: Number,
      required: true
    }
  },
  { _id: false }
)

const teamStandingsSchema = new Schema(
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

teamStandingsSchema.plugin(require('mongoose-autopopulate'))

const TeamStandingsModel = model('TeamStandings', teamStandingsSchema)

export default TeamStandingsModel
