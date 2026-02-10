import jwt from 'jsonwebtoken';

import { serverConfig } from '../config/serverConfig.js';

export const createJwt = (payload) => {
  return  jwt.sign(payload,serverConfig.JWT_SECRET_KEY, {expiresIn: serverConfig.JWT_EXPIRES_IN});
}  