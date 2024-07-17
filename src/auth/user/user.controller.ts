import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserDto } from './dtos/user.dto';
import { UserService } from './user.service';
import { Pagination, PaginationQueryDto } from '../../common/dtos/pagination-query.dto';



@Controller('users')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return await this.userService.create(createUserDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<UserDto> {
    return await this.userService.update(id, updateUserDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserDto> {
    return await this.userService.findOneById(id);
  }

  // get all users with pagination
  @Get()
  async findAll(@Query() query: PaginationQueryDto): Promise<Pagination<UserDto>> {
    return await this.userService.findAll(query);
  }
}
