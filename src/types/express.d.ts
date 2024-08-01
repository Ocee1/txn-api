// express.d.ts
import { IUser } from "interfaces/validation.interface";  // Adjust the path to your user model

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
