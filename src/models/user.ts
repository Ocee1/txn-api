import { Model, QueryContext } from "objection"
import BaseModel from "./baseModel";



export interface IUser extends Document {
  firstName: string,
  lastName: string,
  email: string,
  password: string
}

class User extends BaseModel {
  //cahnged everything asides the normal
  static tableName = 'users';
  id!: string;
  firstName?: string;
  lastName?: string;
  email!: string;
  password!: string;
  bank?: string;
  account_number?: string;
  transactionPin?: string;
  deletedAt?: Date | null; 
  createdAt?: Date;
  updatedAt?: Date;
  

  $beforeInsert(queryContext: QueryContext): Promise<any> | void {
    this.deletedAt = new Date();
  }
}


export default User;