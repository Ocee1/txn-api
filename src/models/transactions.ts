import { Schema, model, Document } from 'mongoose';

export interface ITransaction extends Document {
  user_id: string;
  amount: number;
  transaction_type: 'credit' | 'debit';
  description: string;
  timestamp: Date;
}

const transactionSchema = new Schema<ITransaction>({
  user_id: {
    type: String,
    required: true
  },

  amount: {
    type: Number,
    required: true
  },

  transaction_type: {
    type: String,
    enum: ['credit', 'debit'],
    required: true
  },
  description: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});



export default model<ITransaction>('Transaction', transactionSchema);
