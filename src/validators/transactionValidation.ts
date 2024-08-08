import Joi from '@hapi/joi';
class TransactionValidationSchema {
  public validateTransaction = (data: any) => {
    const schema = Joi.object({
      amount: Joi.number().required().positive(),
      transaction_type: Joi.string().valid('credit', 'debit').required(),
      description: Joi.string().max(500).optional(),
      senderId: Joi.string().required(),
      receiverId: Joi.string().required(),

    });
    return schema.validate(data);
  }
}

export default TransactionValidationSchema;