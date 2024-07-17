export interface ISignup {
  email: string;
  password: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ICreateTxn {
  user_id: string;
  amount: number;
  transaction_type: 'credit' | 'debit';
  description: string;
  timestamp: Date;
}

