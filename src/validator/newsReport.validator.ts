import Joi from 'joi'

const newsReportSchema = Joi.object({
  title: Joi.string().required().messages({
    'any.required': 'title is required',
  }),
  subtitle: Joi.string().required().messages({
    'any.required': 'title is required',
  }),
  photos: Joi.array().items(Joi.string().required()).min(1).max(3).messages({
    'array.base': 'Photos must be an array.',
    'array.empty': 'Photos cannot be empty.',
    'array.min': 'Photos must have at least {#limit} item.',
    'array.max': 'Photos must have at most {#limit} items.',
    'any.required': 'Photos is required.',
    'string.empty': 'Photos cannot contain an empty string.',
  }),
  description: Joi.string().required().messages({
    'any.required': 'description is required',
  }),
})
export default { newsReportSchema }
