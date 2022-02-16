import { model, Schema, Types } from 'mongoose'

const classificationSchema = new Schema(
  {
    position: {
      type: Number,
      required: true
    },
    user: {
      type: Types.ObjectId,
      ref: 'User',
      required: false
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
      required: false
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
  },
  { _id: false }
)

const raceClassificationSchema = new Schema(
  {
    race: {
      type: Types.ObjectId,
      ref: 'Race',
      required: true
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

const RaceClassificationModel = model(
  'RaceClassification',
  raceClassificationSchema
)

export default RaceClassificationModel
