import { model, Schema } from 'mongoose'

const userSchema = new Schema(
  {
    _id: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    userName: {
      type: String,
      required: true
    },
    biography: {
      type: String,
      required: false
    },
    profileImageUrl: {
      type: String,
      required: false
    },
    provider: {
      type: String,
      required: true
    }
  },
  {
    _id: false,
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

const UserModel = model('User', userSchema)

export default UserModel
