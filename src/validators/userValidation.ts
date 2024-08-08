import Joi from '@hapi/joi';
import { ILogin, ISignup } from '../interfaces/validation.interface';

class UserValidationSchema {
  constructor() {}

  public loginValidation = (data: ILogin) => {
    const schema = Joi.object({
      email: Joi.string().email().trim().required(),
      password: Joi.string().min(6).required(),
    });
    return schema.validate(data);
  }

  public signupValidation = (data: ISignup) => {
    const schema = Joi.object({
      firstName: Joi.string(),
      lastName: Joi.string(),
      email: Joi.string().email().trim().required(),
      password: Joi.string().min(6).required()
      .regex(/[a-z]/, 'at least one letter')
      .regex(/[0-9]/, 'at least one number'),      
    });
    return schema.validate(data);
  }

  public transactionPinValidation = (data: string) => {
    const schema = Joi.object({
      transactionPin: Joi.string().pattern(/^\d{4}$/)
      .required()
      .messages({
        'string.base': 'Transaction pin should be a string',
        'string.pattern.base': 'Transaction pin must be a 4-digit number',
        'any.required': 'Transaction pin is required'
      })
    })
    return schema.validate(data)
  }
}

export default UserValidationSchema;