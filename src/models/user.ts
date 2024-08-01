import { Model } from "objection"


export interface IUser extends Document {
  firstName: string,
  lastName: string,
  email: string,
  password: string
}

class User extends Model {
  static tableName = 'users';
  id!: string;
  firstName?: string;
  lastName?: string;
  email!: string;
  password!: string;
  createdAt?: Date;
  updatedAt?: Date;

  static get columnNameMappers() {
    return {
      parseDatabaseJson: (json: any) => {
        if (json.created_at) {
          json.createdAt = new Date(json.created_at);
        }
        if (json.updated_at) {
          json.updatedAt = new Date(json.updated_at);
        }
        return json;
      },
      formatDatabaseJson: (json: any) => {
        if (json.createdAt) {
          json.created_at = json.createdAt.toISOString();
        }
        if (json.updatedAt) {
          json.updated_at = json.updatedAt.toISOString();
        }
        return json;
      },
    } as any; 
  }

}


export default User;