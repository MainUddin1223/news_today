import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userInfoSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user', 'reporter', 'sub-editor', 'editor'],
    default: 'user',
  },
  category: {
    type: String,
    enum: [
      'politics',
      'sports',
      'education',
      'law&order',
      'entertainment',
      'geo-politics',
    ],
    default: '',
  },
  approval: {
    type: String,
    enum: ['not-applicable', 'pending', 'accepted', 'rejected', 'suspended'],
    default: 'not-applicable',
  },
  invitation: {
    type: Boolean,
    default: false,
  },
});

const UserInfo = model('user-info', userInfoSchema);
export default UserInfo;
