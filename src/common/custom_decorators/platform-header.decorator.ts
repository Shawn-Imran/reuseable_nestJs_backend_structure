import { createParamDecorator, ExecutionContext, BadRequestException } from '@nestjs/common';
import { Platform } from '../enums/platform.enum'; // Adjust the path as needed

export const PlatformHeader = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const platform = request.headers['platform'];

    if (!platform) {
      throw new BadRequestException('Platform header is missing');
    }

    if (!Object.values(Platform).includes(platform)) {
      throw new BadRequestException('Invalid platform value');
    }

    return platform;
  },
);
