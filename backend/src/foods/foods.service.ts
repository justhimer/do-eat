import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';

@Injectable()
export class FoodsService {
  constructor(private prisma: PrismaService) { }

  async create(createFoodDto: CreateFoodDto) {
    await this.prisma.foods.create({
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
    const foods = await this.prisma.foods.findMany({
      select: {
        id: true,
        name: true,
        food_types: {
          select: {
            id: true,
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

  async findOne(id: number): Promise<any> {
    const food = await this.prisma.foods.findFirst({
      select: {
        id: true,
        name: true,
        calories: true,
        description: true,
        ingredients: true,
        allergens: true,
        image: true,
      },
      where: {
        id: id,
      },
    });
    return food;
  }

  async update(id: number, updateFoodDto: UpdateFoodDto) {
    await this.prisma.foods.update({
      where: {
        id: id,
      },
      data: {
        name: updateFoodDto.name,
      },
    });
    return `This action updates a #${id} food`;
  }

  async remove(id: number) {
    await this.prisma.foods.delete({
      where: {
        id: id,
      },
    });

    return `This action removes a #${id} food`
  }
}
