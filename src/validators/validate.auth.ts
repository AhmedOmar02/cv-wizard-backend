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
  firstName: Joi.string().max(50).required(),
  lastName: Joi.string().max(50).required(),
  phoneNumber: Joi.string().max(20).optional(),
  city: Joi.string().max(50).optional(),
  country: Joi.string().max(50).optional(),
  linkedinUrl: Joi.string().uri().optional(),
});

export const loginSchema = Joi.object({
  id: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string().required(),
}).xor('id', 'email');
