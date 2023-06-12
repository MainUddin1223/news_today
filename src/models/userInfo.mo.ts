import mongoose from 'mongoose';
import {
  user_approval_enum,
  user_category_enum,
  user_role_enum,
} from '../constant/constant';

const { Schema, model } = mongoose;

const userInfoSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  role: {
    type: String,
    enum: user_role_enum,
    default: 'user',
  },
  category: {
    type: String,
    enum: user_category_enum,
    default: '',
  },
  sub_category: {
    type: [],
    default: [],
  },
  approval: {
    type: String,
    enum: user_approval_enum,
    default: 'not-applicable',
  },
  invitation: {
    type: Boolean,
    default: false,
  },
});

const UserInfo = model('user-info', userInfoSchema);
export default UserInfo;
