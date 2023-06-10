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
          approval: 'pending',
        },
      },
      { new: true }
    );
    return userInfo;
  } else {
    return { status: 400, success: false, message: 'Something went wrong' };
  }
};

// const approveForRole = async (id: string) => {
//   const user = await UserInfo.findOneAndUpdate(
//     { _id: id },
//     { $set: { invitation: false, approval: 'approved' } }
//   );

//   return user;
// };

export { inviteForRole };
