import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateFoodTypeDto } from './dto/create-food_type.dto';
import { UpdateFoodTypeDto } from './dto/update-food_type.dto';

@Injectable()
export class FoodTypesService {
  constructor(private prisma: PrismaService) {}

  async create(createFoodTypeDto: CreateFoodTypeDto) {
    const result = await this.prisma.foodTypes.create({
      data: {
        name: createFoodTypeDto.name,
        icon: createFoodTypeDto.icon,
      },
    });
    return result;
  }

  async findAll() {
    const data = await this.prisma.foodTypes.findMany({
      select:{
        id: true,
        name: true,
      }
    })
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} foodType`;
  }

  update(id: number, updateFoodTypeDto: UpdateFoodTypeDto) {
    return `This action updates a #${id} foodType`;
  }

  remove(id: number) {
    return `This action removes a #${id} foodType`;
  }
}
