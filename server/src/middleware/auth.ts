import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  console.log('Auth Header:', authHeader); // Log the received header

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    console.log('Extracted Token:', token); // Log the extracted token

    const secretKey = process.env.JWT_SECRET_KEY || 'handsome';

    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        console.error('JWT Verification Failed:', err.message); // Log JWT errors
        return res.sendStatus(403); // Forbidden
      }

      console.log('Verified User:', user); // Log the verified user
      req.user = user as JwtPayload;
      return next();
    });
  } else {
    console.error('No Auth Header - Sending 401');
    res.sendStatus(401); // Unauthorized
  }
};
