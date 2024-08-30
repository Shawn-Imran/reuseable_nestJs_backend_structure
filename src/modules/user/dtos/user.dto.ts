import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsEmail, IsMobilePhone, IsOptional, IsEnum, IsBoolean, Length } from 'class-validator';
import { Status } from '../../../common/enums/status.enum';

export class UserDto {
  id: string;
  name: string;
  email: string;
  mobile: string;
  avatar: string;
  isVerified?: boolean;
  isDeleted?: boolean;
  isDisabled?: boolean;
  status?: Status;
  createdAt?: Date;
  updatedAt?: Date;
}




export class CreateUserDto {
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

  @IsOptional()
  @IsBoolean()
  isVerified?: boolean;

  @IsOptional()
  @IsEnum(Status)
  status?: Status;
}



export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsBoolean()
  isDeleted?: boolean;

  @IsOptional()
  @IsBoolean()
  isDisabled?: boolean;
}