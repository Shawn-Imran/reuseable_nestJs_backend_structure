import { IsEmail, IsString, Length } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @Length(1, 100)
  email: string;

  @IsString()
  @Length(6, 250)
  password: string;
}