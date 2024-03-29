import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

function getTheUserInfoFromJwt(req: Request , required:any):any {
  try {
    if (req?.headers?.authorization) {
      const accessToken = req?.headers?.authorization //?.split(' ')[1]; // for passport add Bearer
      const decodedToken = jwt.decode(accessToken as string);
      return decodedToken;
    }
    if(required !='optional')throw new Error('Access token not found');
  } catch (error) {
    throw error;
  }
}

export { getTheUserInfoFromJwt };
