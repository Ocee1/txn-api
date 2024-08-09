import { Model } from "objection";
import BaseModel from "./baseModel";

export class Transaction extends Model {
  static tableName = 'transactions';
// changed senderId and receiver and status
  id!: number;
  senderId!: string;
  receiverId!: string;
  amount!: string;
  status!: 'pending' | 'completed' | 'failed' | 'reversed';
  transactionType!: 'credit' | 'debit';
  description?: string;
  //changed updated at and createdAt
  balanceBefore?: string;
  balanceAfter?: string;
  createdAt?: Date;
  updatedAt?: Date;
}