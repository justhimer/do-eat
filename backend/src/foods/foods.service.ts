import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';

@Injectable()
export class FoodsService {

  constructor(private prisma: PrismaService) { }

  async createFood(createFoodDto: CreateFoodDto) {
    await this.prisma.food.create({
      data: {
        name: createFoodDto.name,
        food_type_id: createFoodDto.food_type_id,
        image: createFoodDto.image,
        calories: createFoodDto.calories,
        description: createFoodDto.description,
        ingredients: createFoodDto.ingredient,
        allergens: createFoodDto.allergens,
      },
    });
    return 'Food created';
  }

  async findAll() {
    const foods = await this.prisma.food.findMany({
      select: {
        id: true,
        food_type: {
          select: {
            name: true,
          },
        },
        image: true,
        calories: true,
        description: true,
        ingredients: true,
        allergens: true,
      },
    });
    return foods;
  }

  findOne(id: number) {
    return `This action returns a #${id} food`;
  }

  update(id: number, updateFoodDto: UpdateFoodDto) {
    return `This action updates a #${id} food`;
  }

  remove(id: number) {
    return `This action removes a #${id} food`;
  }
}
