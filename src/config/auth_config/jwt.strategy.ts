import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../../modules/user/user.service';
import { UserDto } from '../../modules/user/dtos/user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService,
              private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  // async validate(payload: any) {
  //   return { userId: payload.sub, username: payload.username };
  // }

  async validate(payload: any) {
    const user = await this.userService.findOneById(payload.sub); // Adjust the method name and parameters as needed
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const validatedUser: UserDto = {
      id: user.id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      avatar: user.avatar,
    }
    return validatedUser;
  }
}
