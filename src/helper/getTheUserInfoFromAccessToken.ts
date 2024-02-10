import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

function getTheUserInfoFromJwt(req: Request):any {
  try {
    if (req?.headers?.authorization) {
      const accessToken = req?.headers?.authorization?.split(' ')[1]; // Assuming the token is in the "Authorization" header
      const decodedToken = jwt.decode(accessToken as string);
      return decodedToken;
    }
    throw new Error('Access token not found');
  } catch (error) {
    throw error;
  }
}

export { getTheUserInfoFromJwt };
