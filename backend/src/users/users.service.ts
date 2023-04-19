import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { hashPassword } from '../../utils/hash';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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

  async findById(id: number) {
    const foundUser = await this.prisma.users.findFirst({
      where: {
        id: id,
      },
      include: {
        subPlan: {
          select: {
            unlimited: true
          }
        }
      }
    });
    return foundUser;
  }

  async findByEmail(email: string) {
    const foundUser = await this.prisma.users.findFirst({
      where: {
        email: email,
      },
    });
    return foundUser;
  }

  async returnEmail(user_id: number) {
    const foundEmail = await this.prisma.users.findFirst({
      where: { id: user_id }
    })
    if (foundEmail) {
      return foundEmail.email
    } else {
      return ''
    }
  }

  async findIsSubscribed(id: number): Promise<boolean> {
    const result = await this.prisma.users.findFirst({
      select: {
        subscribed: true,
      },
      where: {
        id: id,
      },
    });
    return result.subscribed;
  }

  async findSubscriptionDetails(id: number){
    const result = await this.prisma.users.findFirst({
      select: {
        sub_plan_start: true,
        sub_plan_end: true,
        subPlan: true,
      },
      where: {
        id: id,
      },
    });
    return result;
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

    return result.subPlan.unlimited
  }

  async findProfilePic(id: number): Promise<string> {
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

  async updateUsername(id: number, newUsername: string) {

    const result = await this.prisma.users.update({
      select: {
        id: true,
        email: true,
        username: true,
      },
      where: {
        id: id,
      },
      data: {
        username: newUsername,
      },
    });

    return result;
  }

  async updatePassword(id: number, newPassword: string) {
    const password = await hashPassword(newPassword);
    await this.prisma.users.update({
      where: {
        id: id,
      },
      data: {
        password: password,
      },
    });
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
