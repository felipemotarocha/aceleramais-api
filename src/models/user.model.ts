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
    provider: {
      type: String,
      required: true
    }
  },
  { _id: false }
)

const UserModel = model('User', userSchema)

export default UserModel
