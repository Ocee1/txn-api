import { Model } from "objection";
import BaseModel from "./baseModel";

export class Transfer extends Model {
    static tableName = 'transfers';

    id!: number;
    transactionId!: number;
    amount!: number;
    bank!: string;
    bank_code!: string;
    account_number!: string;
    account_name!: string;
    narration!: string;
    reference!: string;
    transactionType!: 'credit' | 'debit';
    // status!: TransferStatus; // Track transfer status
    createdAt!: Date;
    updatedAt!: Date;
  
}