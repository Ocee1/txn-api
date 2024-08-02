import { Model } from "objection"
import BaseModel from "./baseModel";



export interface IUser extends Document {
  firstName: string,
  lastName: string,
  email: string,
  password: string
}

class User extends BaseModel {
  static tableName = 'users';
  id!: string;
  firstName?: string;
  lastName?: string;
  email!: string;
  password!: string;
  createdAt?: Date;
  updatedAt?: Date;



}


export default User;