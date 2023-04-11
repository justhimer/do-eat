import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { hashPassword } from '../../utils/hash';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    const password = await hashPassword(createUserDto.password);
    const newUser = await this.prisma.users.create({
      data: {
        email: createUserDto.email,
        username: createUserDto.username,
        password: password,
        icon: createUserDto.icon
      },
    });
    return { 
      msg: 'User created',
      data: {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username
      }
    };
  }

  async createByFacebook(email: string, username: string) {
    const password = await hashPassword('facebook');
    const user = await this.prisma.users.create({
      data: {
        email: email,
        username: username,
        password: password,
      },
    });
    return user;
  }

  // async findAll(): Promise<User[]> {
  //   return await this.prisma.users.findMany({});
  // }

  async findById(id: number) {
    const foundUser = await this.prisma.users.findFirst({
      where: {
        id: id,
      },
    });
    // if (!foundUser) throw new NotFoundException('User not found.');
    return foundUser;
  }

  async findByEmail(email: string) {
    const foundUser = await this.prisma.users.findFirst({
      where: {
        email: email,
      },
    });
    // if (!foundUser) throw new NotFoundException('User not found.');
    return foundUser;
  }

  // async findByUsername(username: string) {
  //   const foundUser = await this.prisma.users.findFirst({
  //     where: {
  //       username: username,
  //     },
  //   });
  //   // if (!foundUser) throw new NotFoundException('User not found.');
  //   return foundUser;
  // }

  async findIsSubscribed(id: number): Promise<boolean> {
    const result = await this.prisma.users.findFirst({
      select: {
        subscribed: true,
      },
      where: {
        id: id,
      },
    });
    // if (!foundUser) throw new NotFoundException('User not found.');
    return result.subscribed;
  }

  async findIsUnlimited(id: number): Promise<boolean> {
    const result = await this.prisma.users.findFirst({
      include: {
        subPlan: {
          select: {
            unlimited: true
          }
        }
      },
      where: {
        id: id
      }
    })

    console.log("findIsUnlimited: ", result.subPlan.unlimited)
    return result.subPlan.unlimited
  }

  async findProfilePic(id:number): Promise<string> {
    const result = await this.prisma.users.findFirst({
      select: {
        icon: true,
      },
      where: {
        id: id,
      },
    });
    return result.icon;
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
      },
    });
  }
}
