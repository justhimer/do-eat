import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateFoodTypeDto } from './dto/create-food_type.dto';
import { UpdateFoodTypeDto } from './dto/update-food_type.dto';

@Injectable()
export class FoodTypesService {
  
  constructor(private prisma: PrismaService) { }

  async create(createFoodTypeDto: CreateFoodTypeDto) {
    await this.prisma.foodType.create({
      data: {
        name: createFoodTypeDto.name,
      }
    })
    return 'Created food type';
  }

  findAll() {
    return `This action returns all foodTypes`;
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