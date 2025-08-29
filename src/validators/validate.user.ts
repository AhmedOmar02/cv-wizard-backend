import Joi from 'joi';

const updateUserSchema = Joi.object({
  firstName: Joi.string().max(50).optional(),
  lastName: Joi.string().max(50).optional(),
  phoneNumber: Joi.string().max(20).optional(),
  city: Joi.string().max(50).optional(),
  country: Joi.string().max(50).optional(),
  linkedinUrl: Joi.string().uri().optional(),
}).min(1).message('At least 1 attribute is required to update');

export {
  updateUserSchema,
}
