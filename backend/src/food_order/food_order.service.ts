import { Injectable } from '@nestjs/common';
import { CreateFoodOrderDto } from './dto/create-food_order.dto';
import { UpdateFoodOrderDto } from './dto/update-food_order.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class FoodOrderService {
  constructor(private prisma: PrismaService) { }

  async createOrder(createFoodOrderDto: CreateFoodOrderDto) {
    const createdOrder = await this.prisma.foodOrder.create({
      data: {
        food_id: createFoodOrderDto.food_id,
        quantity: createFoodOrderDto.quantity,
        food_history_id: createFoodOrderDto.food_history_id,
      },
    });
    return createdOrder;
  }

  async totalCalories(food_order_id: number) {
    const data = await this.prisma.foodOrder.findFirst({
      where: {
        id: food_order_id
      },
      select: {
        quantity: true,
        food: {
          select: {
            calories: true
          }
        }
      }
    });
    const totalCalories = data.food.calories * data.quantity;
    return totalCalories;
  }

  findAll() {
    return `This action returns all foodOrder`;
  }

  findOne(id: number) {
    return `This action returns a #${id} foodOrder`;
  }

  update(id: number, updateFoodOrderDto: UpdateFoodOrderDto) {
    return `This action updates a #${id} foodOrder`;
  }

  remove(id: number) {
    return `This action removes a #${id} foodOrder`;
  }
}
