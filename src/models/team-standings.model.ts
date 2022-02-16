import { model, Schema, Types } from 'mongoose'

const standingsSchema = new Schema(
  {
    team: {
      type: Types.ObjectId,
      ref: 'Team',
      required: true
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

teamStandingsSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})

const TeamStandingsModel = model('TeamStandings', teamStandingsSchema)

export default TeamStandingsModel
