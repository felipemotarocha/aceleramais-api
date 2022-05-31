import { model, Schema, Types } from 'mongoose'
import { env } from '../config/env.config'

const adminSchema = new Schema(
  {
    user: {
      type: String,
      ref: 'User',
      required: true,
      autopopulate: {
        select: ['id', 'firstName', 'lastName', 'profileImageUrl', 'userName']
      }
    },
    isCreator: {
      type: Boolean,
      required: true
    }
  },
  { _id: false }
)

const driverBonificationSchema = new Schema(
  {
    bonification: {
      type: Types.ObjectId,
      ref: 'Bonification',
      required: true,
      autopopulate: {
        select: ['name', 'points']
      }
    },
    race: {
      type: Types.ObjectId,
      ref: 'Race',
      required: false
    }
  },
  { _id: false }
)

const driverPenaltySchema = new Schema(
  {
    penalty: {
      type: Types.ObjectId,
      ref: 'Penalty',
      required: true,
      autopopulate: {
        select: ['name', 'points']
      }
    },
    race: {
      type: Types.ObjectId,
      ref: 'Race',
      required: false
    }
  },
  { _id: false }
)

const driversSchema = new Schema(
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
    isRegistered: {
      type: Boolean,
      required: true
    },
    isRemoved: {
      type: Boolean,
      required: true
    },
    bonifications: {
      type: [driverBonificationSchema],
      required: false
    },
    penalties: {
      type: [driverPenaltySchema],
      required: false
    }
  },
  { _id: false }
)

const pendentDriverSchema = new Schema(
  {
    user: {
      type: String,
      required: true,
      ref: 'User',
      autopopulate: {
        select: ['id', 'firstName', 'lastName', 'profileImageUrl', 'userName']
      }
    },
    team: {
      type: Types.ObjectId,
      required: false,
      ref: 'Team',
      autopopulate: { select: ['id', 'name', 'color'] }
    }
  },
  { _id: false }
)

const championshipSchema = new Schema(
  {
    code: {
      type: String,
      required: false
    },
    name: {
      type: String,
      required: true
    },
    avatarImageUrl: {
      type: String,
      required: false,
      default: `https://${env.cloudFrontUrl}/championship-avatars/default.png`
    },
    description: {
      type: String,
      required: false
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
    admins: {
      type: [adminSchema],
      required: true
    },
    pendentDrivers: {
      type: [pendentDriverSchema],
      required: false
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
    },
    bonifications: {
      type: [Types.ObjectId],
      ref: 'Bonification',
      required: false
    },
    penalties: {
      type: [Types.ObjectId],
      ref: 'Penalty',
      required: false
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

championshipSchema.virtual('nextRaces', {
  ref: 'Race',
  localField: '_id',
  foreignField: 'championship',
  match: { isCompleted: false },
  options: {
    sort: { startDate: 'asc' },
    limit: 3,
    match: {
      isCompleted: false
    }
  }
})

championshipSchema.pre('find', function (next) {
  this.populate({
    path: 'nextRaces',
    select: ['_id', 'track', 'startDate', 'isCompleted', '-championship'],
    match: { isCompleted: false }
  })

  next()
})

championshipSchema.plugin(require('mongoose-autopopulate'))

const ChampionshipModel = model('Championship', championshipSchema)

export default ChampionshipModel
