import { ILoginUser, IRegisterUser } from '../interface/auth.interface';
import bcrypt from 'bcrypt';
import User from '../models/auth.mo';
import jwt from 'jsonwebtoken';
import config from '../config';
import UserInfo from '../models/userInfo.mo';
import ApiError from '../errorHandler/ApiError';
const saltRounds = 10;
const { jwt_access_token } = config;

const hashingPassword = async (password: string) => {
  const hashPassword = await bcrypt.genSalt(saltRounds);
  return bcrypt.hash(password, hashPassword);
};

const validateUser = async (email: string, password: string) => {
  const findUser = await User.aggregate([
    {
      $match: { email },
    },
    {
      $lookup: {
        from: 'user-infos',
        localField: '_id',
        foreignField: 'userId',
        as: 'userInfo',
      },
    },
    {
      $addFields: {
        userInfo: { $arrayElemAt: ['$userInfo', 0] },
      },
    },
  ]);

  const userData = findUser[0];
  if (!userData) {
    // return { status: 400, success: false, message: 'Invalid email' };
    throw new ApiError(400, 'Your email is Invalid ');
  } else {
    const userPassword = userData.password;
    const matchedPassword = await bcrypt.compare(password, userPassword);
    if (!matchedPassword) {
      throw new ApiError(400, 'Invalid Password');
    } else {
      userData.password = '';
      const { email, name, _id, userInfo } = userData;
      const payload = {
        email,
        name,
        _id,
        role: userInfo.role,
        category: userInfo.category,
        sub_category: userInfo.sub_category,
        approval: userInfo.approval,
      };
      const token = jwt.sign(payload, jwt_access_token as string, {
        expiresIn: '1d',
      });
      return { status: 200, success: true, result: { userData, token } };
    }
  }
};

const userRegisterService = async (data: IRegisterUser) => {
  const { email, password, name } = data;
  const hashPassword = await hashingPassword(password);
  const registerUser = new User({
    email,
    password: hashPassword,
    name,
  });
  const saveUser = await registerUser.save();
  const userInfo = new UserInfo({
    userId: saveUser._id,
  });
  const userData = await userInfo.save();
  saveUser.password = '';
  const payload = {
    email: saveUser.email,
    name: saveUser.name,
    _id: saveUser._id,
    role: userInfo.role,
    category: userInfo.category,
    approval: userInfo.approval,
  };
  const token = jwt.sign(payload, jwt_access_token as string, {
    expiresIn: '1d',
  });
  const result = { saveUser, userData, token };
  return result;
};

const loginUserService = async (data: ILoginUser) => {
  const { email, password } = data;
  const result = await validateUser(email, password);
  return result;
};

export default { userRegisterService, loginUserService };
