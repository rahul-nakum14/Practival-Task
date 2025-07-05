import Joi from 'joi';
import { CustomError } from './customError';

export const productSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  quantity: Joi.number().integer().min(0).required(),
  categoryIds: Joi.array().items(Joi.number().integer()).min(1).required(),
});

export const validate = (schema: Joi.ObjectSchema, payload: any) => {
  const { error } = schema.validate(payload);
  if (error) throw new CustomError(error.details[0].message, 400);
};