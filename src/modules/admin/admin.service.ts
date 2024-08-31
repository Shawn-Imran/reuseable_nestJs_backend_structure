import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from '../auth/dtos/login.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Admin } from './entities/admin.model';
import { RegisterDto } from '../auth/dtos/register.dto';

@Injectable()
export class AdminService {

  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { name, password, email, mobile } = registerDto;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = {
      name,
      email,
      mobile,
      password: hashedPassword,
    };
    await this.adminRepository.save(newAdmin);

    // return `User ${name} registered successfully`;
    return {
      success: true,
      message: `Admin ${name} registered with ${email} successfully`,
      user: {
        name,
        email,
      }
    }
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find the user by email
    const admin = await this.adminRepository.findOne({ where: { email } });
    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate a JWT token
    const payload = { name: admin.name, sub: admin.id };
    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        mobile: admin.mobile,
        avatar: admin.avatar,
      },
    };
  }
}
