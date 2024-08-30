import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Platform } from '../enums/platform.enum'; // Adjust the path as needed

@Injectable()
export class PlatformMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const platform = req.headers['platform'];

    if (!platform) {
      throw new BadRequestException('Platform header is missing');
    }

    // Handle if platform is an array
    if (Array.isArray(platform)) {
      throw new BadRequestException('Invalid platform value; should not be an array');
    }

    // Type assertion to string and validation against enum
    if (!Object.values(Platform).includes(platform as Platform)) {
      throw new BadRequestException('Invalid platform value');
    }

    next();
  }
}