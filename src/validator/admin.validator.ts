import Joi from 'joi';

const adminInvitationValidatorSchema = Joi.object({
  email: Joi.string()
    .pattern(new RegExp('^\\S+@\\S+\\.\\S+$'))
    .required()
    .messages({
      'string.pattern.base': 'Please enter a valid email address',
      'any.required': 'Email is required',
    }),
  role: Joi.string()
    .valid('user', 'reporter', 'sub-editor', 'editor')
    .required()
    .messages({
      'any.required': 'role field is required',
      'any.only':
        'role field must be one of "user", "reporter", "sub-editor", "editor"',
    }),
  category: Joi.string()
    .valid(
      '',
      'super',
      'politics',
      'tech',
      'sports',
      'business',
      'health',
      'education',
      'law&order',
      'entertainment',
      'Politics'
    )
    .required()
    .messages({
      'any.required': 'role field is required',
    }),
  sub_category: Joi.array()
    .items(
      Joi.string().valid(
        '',
        'international',
        'geo',
        'national',
        'football',
        'cricket',
        'basketball'
      )
    )
    .optional(),
});

export { adminInvitationValidatorSchema };
