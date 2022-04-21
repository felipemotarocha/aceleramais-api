import { model, Schema, Types } from 'mongoose'

const classificationSchema = new Schema(
  {
    position: {
      type: Number,
      required: true
    },
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
      autopopulate: true
    },
    isRegistered: {
      type: Boolean,
      required: true
    },
    isRemoved: {
      type: Boolean,
      required: true
    },
    scores: {
      type: Boolean,
      required: true
    },
    hasFastestLap: {
      type: Boolean,
      required: false
    },
    hasPolePosition: {
      type: Boolean,
      required: false
    }
  },
  { _id: false }
)

const raceClassificationSchema = new Schema(
  {
    race: {
      type: Types.ObjectId,
      ref: 'Race',
      required: true,
      autopopulate: {
        select: ['id', 'startDate', 'isCompleted', 'track', 'championship']
      }
    },
    classification: {
      type: [classificationSchema],
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

raceClassificationSchema.plugin(require('mongoose-autopopulate'))

const RaceClassificationModel = model(
  'RaceClassification',
  raceClassificationSchema
)

export default RaceClassificationModel
