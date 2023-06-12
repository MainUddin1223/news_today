import ApiError from '../errorHandler/ApiError';
import { IInviteForRole } from '../interface/auth.interface';
import User from '../models/auth.mo';
import UserInfo from '../models/userInfo.mo';

const inviteForRole = async (data: IInviteForRole) => {
  const user = await User.findOne({ email: data.email });
  if (user) {
    const userInfo = await UserInfo.findOneAndUpdate(
      { userId: user._id },
      {
        $set: {
          invitation: true,
          role: data.role,
          category: data.category,
          sub_category: data.sub_category,
          approval: 'pending',
        },
      },
      { new: true }
    );
    return userInfo;
  } else {
    throw new ApiError(500, 'Something went wrong');
  }
};

export { inviteForRole };
