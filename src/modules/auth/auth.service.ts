import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/User.model';
import { Repository } from 'typeorm';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { name, password, email, mobile } = registerDto;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      email,
      mobile,
      password: hashedPassword,
    };
    await this.userRepository.save(newUser);

    return `User ${name} registered successfully`;
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find the user by email
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate a JWT token
    const payload = { username: user.name, sub: user.id };
    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
      },
    };
  }

  async logout(user: any) {
    return 'This action logs a user out';
  }

  async getProfile(user: any) {
    return user;
  }

  async validateUser(username: string, pass: string): Promise<any> {
    if (username === 'test' && pass === 'test')
      return { userId: 1, username: 'test' };
    return null;
  }

  async loginWithGoogle() {
    return 'This action logs a user in with Google';
  }

  async loginWithFacebook() {
    return 'This action logs a user in with Facebook';
  }
}
