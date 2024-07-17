import { compare, hash } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { JWT_EXPIRATION, JWT_SECRET } from '../config/config';

class Crypto {
  constructor() { }

  static encrypt = async (data: any) => {
    const result = sign(data, JWT_SECRET, { algorithm: 'HS512', expiresIn: JWT_EXPIRATION });
    return result;
  };

  static decrypt = async (jwtToken: string) => {
    const result = verify(jwtToken, JWT_SECRET);
    return result;
  };

    static hashString = async (toBeHashedData: string) => {
    const hashPass = await hash(toBeHashedData.trim(), 11);
    return hashPass;
  };

  static compareStrings = async (hashedString: string, toBeComparedString: string) => {
    const result = await compare(toBeComparedString.trim(), hashedString);
    return result;
  };
}
export default Crypto;
