import User from "../models/user";

class UserService {
  constructor() {}

  protected model = User;

  public createUser = async (data: any) => {
    const result = await this.model.query().insert(data);
    return result;
  };

  public getUserById = async (id: string) => {
    const user = await this.model.query().findById(id);
    return user;
  }

  public getUserByEmail = async (email: string) => {
    const user: User | null = (await this.model.query().where({ email }).first());
    return user;
  };

  public findByIdAndUpdate = async (data: Partial<User>, id: string) => {
    const user = await this.model.query().patchAndFetchById(id, data);
    return user;
  };

  public removeUser = async (id: string) => {
    const user = await this.model.query().deleteById(+id);
    return user;
  };
}

export default UserService;