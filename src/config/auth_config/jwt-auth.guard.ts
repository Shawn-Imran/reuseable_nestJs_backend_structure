import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info, context: ExecutionContext) {
    const response = context.switchToHttp().getResponse<Response>();
    if (user) {
      response.locals.user = user;
    }
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}