import { Model } from "objection";
import BaseModel from "./baseModel";

export class Transfer extends Model {
    static tableName = 'transfers';

    id!: string;
    transactionId!: string;
    amount!: string;
    bank!: string;
    bank_code!: string;
    account_number!: string;
    account_name!: string;
    narration!: string;
    reference!: string;
    transactionType!: 'credit' | 'debit';
    createdAt!: Date;
    updatedAt!: Date;
  
}