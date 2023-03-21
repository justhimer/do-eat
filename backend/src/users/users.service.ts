import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService) { }


  async create(createUserDto: CreateUserDto) {

    await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        username: createUserDto.username,
        password: createUserDto.password,
        icon: createUserDto.icon
      },
    });
    return 'User created';
  }

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany({});
  }

  async findOne(id: number) {
    let foundUser = await this.prisma.user.findFirst({
      where: {
        id: id,
      }
    })
    if (!foundUser) throw new NotFoundException('User not found.')
    return foundUser;
  }

  async update(id:number, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: updateUserDto,
    });
    
    return `User id: ${id} has been deleted`;
  }

  remove(id: number) {

  }
}
