import { NextFunction, Request, Response } from "express";
import UserService from "../services/userService";
import UserValidationSchema from "../validators/userValidation";
import AppResponse from "../utils/Response";
import Crypto from "../utils/encrypt.utils";

class UserController {
  constructor() { }

  protected service = new UserService()
  protected userValidation = new UserValidationSchema();
  protected appResponse = new AppResponse();

  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;


    try {
      const { error } = this.userValidation.signupValidation(body);

      if (error) return this.appResponse.badRequest(res, { error: { message: error.message } });

      const isUser = await this.service.getUserByEmail(body.email);
      if (isUser) return this.appResponse.badRequest(res, { error: { message: 'User already exists!' } })

      const hashedPassword = await Crypto.hashString(body.password);

      const userData = {
        ...body,
        password: hashedPassword
      }

      const user = await this.service.createUser(userData);
      this.appResponse.created(res, 'User created successfully');

    } catch (error) {
      next(error.message);
    }
  }
  public loginUser = async (req: Request, res: Response, next: NextFunction) => {
  
    const { body } = req;

    try {
      const { error } = this.userValidation.loginValidation(body);

      if (error) return this.appResponse.badRequest(res, error.message);

      const isUser = await this.service.getUserByEmail(body.email);
      if (!isUser) return this.appResponse.badRequest(res, 'Invalid login credentials');

      const validPassword = await Crypto.compareStrings(isUser.password, body.password);
    
      if (!validPassword) return this.appResponse.badRequest(res, 'Invalid login credentials');

      const accessToken = await Crypto.encrypt({ id: isUser.id, email: isUser.email })
      const payload = {
        message: 'Login successful',
        userId: isUser.id,
        accessToken,
      }

      this.appResponse.success(res, payload);

    } catch (error) {
      next(error.message);
    }
  }

  public getUserProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.id;
      const user = await this.service.getUserById(userId);
      if (!user) {
        return this.appResponse.notFound(res, { message: 'User not found' });
      }
      this.appResponse.success(res, { user });
    } catch (error) {
      next(error);
    }
  }

  public updateUserProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.id;
      const updates = req.body;
      const updatedUser = await this.service.findByIdAndUpdate(userId, updates);
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user.id;
        const deletedUser = await this.service.removeUser(userId);
        if (!deletedUser) {
            return this.appResponse.notFound(res, { message: 'User not found' });
        }
        this.appResponse.deleted(res)
    } catch (error) {
        next(error);
    }
}
}

export default UserController;