import User, { IUser } from "../models/user";

class UserService {
  constructor() {}

  protected model = User;

  public createUser = async (data: any) => {
    const result = await this.model.create(data);
    return result;
  };

  public getUserById = async (id: string) => {
    const user = (await this.model.findById(id)).isSelected('-password');
    return user;
  }

  public getUserByEmail = async (email: string) => {
    const user: IUser | null = (await this.model.findOne({ email }));
    return user;
  };

  public findByIdAndUpdate = async (data: any, id: string) => {
    const user = await this.model.findByIdAndUpdate(id, data, { upsert: false });
    return user;
  };

  public removeUser = async (id: string) => {
    const user = await this.model.findByIdAndDelete(id);
    return user;
  };
}

export default UserService;