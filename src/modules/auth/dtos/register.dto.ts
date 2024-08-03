import { IsEmail, IsMobilePhone, IsOptional, IsString, Length } from 'class-validator';

export class RegisterDto {
  @IsString()
  @Length(1, 50)
  name: string;

  @IsEmail()
  @Length(1, 100)
  email: string;

  @IsMobilePhone()
  @Length(1, 14)
  mobile: string;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  avatar?: string;

  @IsString()
  @Length(6, 250) // Ensure password has a minimum length
  password: string;
}

// sample json data
// {
//   "name": "John Doe",
//   "email": "
//   "mobile": "+1234567890",
//   "password": "password"
// }