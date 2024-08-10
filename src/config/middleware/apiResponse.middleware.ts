import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';


@Injectable()
export class ApiResponseMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    res.locals.done = (success: boolean, message?: string, data?: any, code?: number, stack?: any) => {
      const cd = code || (success ? 200 : 406);
      res.status(cd).json({
        success,
        code: cd,
        data: success ? data : null,
        // message: message,
        message: success ? null : message,
        stackTrace: stack,
        timestamp: new Date(),
      });
    };

    next();
  }
}