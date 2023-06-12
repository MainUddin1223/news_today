import Joi from 'joi';
import {
  user_category_enum,
  user_sub_category_enum,
} from '../constant/constant';

const adminInvitationValidatorSchema = Joi.object({
  role: Joi.string()
    .valid('user', 'reporter', 'sub-editor', 'editor')
    .required()
    .messages({
      'any.required': 'role field is required',
      'any.only':
        'role field must be one of "user", "reporter", "sub-editor", "editor"',
    }),
  category: Joi.string().valid(user_category_enum).required().messages({
    'any.required': 'role field is required',
  }),
  sub_category: Joi.array()
    .items(Joi.string().valid(user_sub_category_enum))
    .optional(),
});

export const adminValidator = { adminInvitationValidatorSchema };
