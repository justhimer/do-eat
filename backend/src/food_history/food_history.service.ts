import { Injectable } from '@nestjs/common';
import { CreateFoodHistoryDto } from './dto/create-food_history.dto';
import { UpdateFoodHistoryDto } from './dto/update-food_history.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class FoodHistoryService {
  constructor(private prisma: PrismaService) { }

  async findAllNotCollected(user_id: number) {
    const foods = await this.prisma.foodHistory.findMany({
      select: {
        
      },
      where: {
        user_id: user_id,
      }
    })
    return `This action returns all foodHistory`;
  }
  
  create(createFoodHistoryDto: CreateFoodHistoryDto) {
    return 'This action adds a new foodHistory';
  }

  findOne(id: number) {
    return `This action returns a #${id} foodHistory`;
  }

  update(id: number, updateFoodHistoryDto: UpdateFoodHistoryDto) {
    return `This action updates a #${id} foodHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} foodHistory`;
  }
}
