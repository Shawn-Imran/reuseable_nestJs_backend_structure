import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/User.model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, UpdateUserDto, UserDto } from './dtos/user.dto';
import { plainToInstance } from 'class-transformer';
import * as bcrypt from 'bcryptjs';
import { Pagination, PaginationQueryDto } from '../../common/dtos/pagination-query.dto';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.userRepository.create({ ...createUserDto, password: hashedPassword });
    const savedUser = await this.userRepository.save(user);
    return plainToInstance(UserDto, savedUser);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDto> {
    await this.userRepository.update(id, updateUserDto);
    const updatedUser = await this.userRepository.findOne({ where: { id } });
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return plainToInstance(UserDto, updatedUser);
  }

  async findOneById(id: string): Promise<UserDto> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return plainToInstance(UserDto, user);
  }

  async findAll(query: PaginationQueryDto): Promise<Pagination<UserDto>> {
    const [users, total] = await this.userRepository.findAndCount({
      take: query.limit,
      skip: query.limit * (query.page - 1),
    });
    return {
      data: users.map(user => plainToInstance(UserDto, user)),
      meta: {
        page: query.page,
        limit: query.limit,
        totalItems: total,
        totalPages: Math.ceil(total / query.limit),
      },
    };
  }
}
