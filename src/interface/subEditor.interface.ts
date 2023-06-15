import mongoose from 'mongoose';

export type ISubEditorPayload = {
  email: string;
  name: {
    firstName: string;
    lastName: string;
  };
  _id: string;
  category: string;
  sub_category?: string;
};
export type ISubEditormatchCondition = {
  _id: mongoose.Types.ObjectId;
  category: string;
  sub_category?: {
    $in: string;
  };
};
export type IReportPayload = ISubEditorPayload & {
  id: string;
};
