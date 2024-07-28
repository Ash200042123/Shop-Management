import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface CustomRequest extends Request {
  user?: { userId: number; email: string; role: string } | JwtPayload;
}

// General Auth Middleware
const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  console.log('Authorization Header:', authHeader);

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    console.log('Token:', token);

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
        if (err) {
          console.error('JWT Verification Error:', err);
          return res.status(403).json({ message: 'Forbidden' });
        }

        console.log('Verified User:', user);
        req.user = user as { userId: number; email: string; role: string };
        next();
      });
    } else {
      console.log('No token provided in Authorization header');
      res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
  } else {
    console.log('No Authorization header');
    res.status(401).json({ message: 'Unauthorized: No token provided' });
  }
};

// Admin Role Middleware
const adminMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
  authMiddleware(req, res, () => {
    if (req.user && (req.user as { userId: number; email: string; role: string }).role === 'Admin') {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden: Admins only' });
    }
  });
};

export { authMiddleware, adminMiddleware };
