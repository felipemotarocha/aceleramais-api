import { model, Schema } from 'mongoose'

const userSchema = new Schema({})

const UserModel = model('User', userSchema)

export default UserModel
