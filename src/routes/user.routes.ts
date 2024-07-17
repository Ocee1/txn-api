import { Router } from 'express';
import { IRoutes } from '../interfaces/routes.interface';
import UserController from '../controllers/userController';
import Auth from '../middlewares/auth';


class UserRouter implements IRoutes {
  public path = '/auth';
  public router = Router();
  private userController: UserController = new UserController();
  private auth = new Auth();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/signup`, this.userController.createUser);
    this.router.post(`${this.path}/signin`, this.userController.loginUser);
    this.router.get(`/profile`, this.auth.authorize, this.userController.getUserProfile);
    this.router.patch(`/profile`, this.auth.authorize, this.userController.updateUserProfile);
    this.router.delete(`/profile`, this.auth.authorize, this.userController.deleteUser);
  }
};

export default UserRouter;
