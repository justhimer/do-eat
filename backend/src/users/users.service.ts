import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService) { }


  async create(createUserDto: CreateUserDto) {

    // await this.prisma.users.create({
    //   data: {
    //     email: createUserDto.email,
    //     username: createUserDto.username,
    //     password: createUserDto.password,
    //     icon: createUserDto.icon
    //   },
    // });
    // return 'User created';

  }

  async findAll(): Promise<User[]> {
    return await this.prisma.users.findMany({});
  }

  async findOne(id: number) {
    let foundUser = await this.prisma.users.findFirst({
      where: {
        id: id,
      }
    })
    if (!foundUser) throw new NotFoundException('User not found.')
    return foundUser;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.prisma.users.update({
      where: {
        id: id,
      },
      data: updateUserDto,
    });

    return `User id: ${id} has been deleted`;
  }

  async remove(id: number) {
    await this.prisma.users.delete({
      where: {
        id: id,
      }
    });
  }
}
