import { Model } from "objection";

export class Transaction extends Model {
  static tableName = 'transactions';

  id!: number;
  userId!: string;
  amount!: number;
  transactionType!: 'credit' | 'debit';
  description?: string;
  timestamp!: Date;

  static get columnNameMappers() {
    return {
      parseDataBaseJson: (json: any) => {
        json.userId = json.user_id;
        json.transactionType = json.transaction_type;
        delete json.user_id;
        delete json.transaction_type;
        return json;
      },

      formatDataBaseJson: (json: any) => {
        json.user_id = json.userId;
        json.transaction_type = json.transactionType;
        delete json.userId;
        delete json.transactionType;
        return json;
      },
    } as any;
  }
}