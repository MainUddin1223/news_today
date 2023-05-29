import Joi from 'joi'

export const registerUserSchema = Joi.object({
  email: Joi.string()
    .pattern(new RegExp('^\\S+@\\S+\\.\\S+$'))
    .required()
    .messages({
      'string.pattern.base': 'Please enter a valid email address',
      'any.required': 'Email is required',
    }),
  password: Joi.string().min(8).max(16).required().messages({
    'string.min': 'Password must be at least {#limit} characters long',
    'string.max': 'Password cannot exceed {#limit} characters',
    'any.required': 'Password is required',
  }),
  name: Joi.object({
    firstName: Joi.string().required().messages({
      'any.required': 'First name is required',
    }),
    lastName: Joi.string().required().messages({
      'any.required': 'Last name is required',
    }),
  })
    .required()
    .messages({
      'any.required': 'Name object is required',
    }),
})
