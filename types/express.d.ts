import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any; // Adjust the type of user according to your needs
    }
  }
}
