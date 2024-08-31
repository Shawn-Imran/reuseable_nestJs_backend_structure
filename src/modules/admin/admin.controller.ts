import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from '../auth/dtos/register.dto';
import { AdminService } from './admin.service';
import { LoginDto } from '../auth/dtos/login.dto';

@Controller('admin')
export class AdminController {

  constructor(private readonly adminService: AdminService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.adminService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.adminService.login(loginDto);
  }
}
