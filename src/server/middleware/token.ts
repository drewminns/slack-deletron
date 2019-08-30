import jwt from 'jsonwebtoken';
import { TOKEN_KEY } from '../config';
import { IJWT, ICustomRequest } from '../interfaces';
import { Request, Response, NextFunction } from 'express';

export function issueJWT(token: IJWT['token'], userId: IJWT['userId']) {
  return jwt.sign({ token, userId }, TOKEN_KEY);
}

export function verifyToken(request: Request, res: Response, next: NextFunction): void {
  const req = request as ICustomRequest;
  let token: string = (req.headers['x-access-token'] as string) || (req.headers['authorization'] as string);
  if (token) {
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }

    jwt.verify(token, TOKEN_KEY, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid',
        });
      } else {
        req.decoded = decoded as IJWT;
        next();
      }
    });
  } else {
    res.json({
      success: false,
      message: 'Token is not valid',
    });
  }
}
