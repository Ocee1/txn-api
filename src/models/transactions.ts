import { Model } from "objection";
import BaseModel from "./baseModel";

export class Transaction extends Model {
  static tableName = 'transactions';

  id!: number;
  userId!: string;
  amount!: number;
  transactionType!: 'credit' | 'debit';
  description?: string;
  timestamp!: Date;

  
}