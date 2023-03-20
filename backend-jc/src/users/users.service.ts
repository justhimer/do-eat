import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService) {}

  users: User[] = [];
  idx = 1;

  create(createUserDto: CreateUserDto): User {
    this.users.push({ id: this.idx, ...createUserDto });
    this.idx++;
    return this.users[this.users.length - 1];
  }

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany({});
  }

  findOne(id: number) {
    let foundUser = this.users.find((user) => user.id === id);
    if (!foundUser) throw new NotFoundException('User not found.')
    return foundUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    let foundUser = this.users.find((user) => user.id === id);
    Object.assign(this.users[foundUser.id], updateUserDto);
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    this.users = this.users.filter((user) => user.id !== id);
    return `This action removes a #${id} user`;
  }
}
