import mongoose from 'mongoose'

const { Schema, model } = mongoose

const userInfoSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user', 'reporter', 'editor'],
    default: 'user',
  },
  category: {
    type: String,
    default: '',
  },
  approval: {
    type: String,
    enum: ['user', 'pending', 'approved', 'suspended'],
    default: 'user',
  },
  invitation: {
    type: Boolean,
    default: false,
  },
})

const UserInfo = model('user-info', userInfoSchema)
export default UserInfo
