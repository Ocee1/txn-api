import { JwtPayload } from 'jsonwebtoken';
import User, { IUser } from '../models/user';
import Crypto from '../utils/encrypt.utils';
import { NextFunction, Request, Response } from 'express';

interface DecodedToken extends JwtPayload {
  id: string;
}

class Auth {
  constructor() { }
  

  public authorize = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) return res.status(403).send({error: 'Unauthorised User'});

    if (typeof token !== 'string') return res.status(403).send({error: { message: 'Invalid Authorization token'}});

    try {
      const decodeToken = await Crypto.decrypt(token);

      const id = (decodeToken as JwtPayload).id
      const user1 = await User.findById(id);

      if (!user1) return res.status(403).send({error: { message: 'User not authorized'}});


      req.user = user1;
      next();

    } catch (e) {
      const errors = ['TokenExpiredError', 'NotBeforeError', 'JsonWebTokenError'];
      if (errors.includes(e?.name)) return res.status(403).send(e);
      next(e);
    }
  };
}
export default Auth;
