import Joi from 'joi';

export const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .max(72)
    .required()
    .pattern(/[A-Z]/, 'uppercase letter')
    .pattern(/[a-z]/, 'lowercase letter')
    .pattern(/\d/, 'number')
    .pattern(/[\W_]/, 'special character')
    .messages({
      'string.min': 'Password must be at least 8 characters long',
      'string.pattern.name': 'Password must contain at least one {#name}',
      'any.required': 'Password is required',
    }),
  firstName: Joi.string().max(50).optional(),
  lastName: Joi.string().max(50).optional(),
  phoneNumber: Joi.string().max(20).optional(),
  city: Joi.string().max(50).optional(),
  country: Joi.string().max(50).optional(),
  linkedinUrl: Joi.string().uri().optional(),
  role: Joi.string()
    .valid('regular', 'admin') // extend if you want more roles
    .default('regular'),
});
