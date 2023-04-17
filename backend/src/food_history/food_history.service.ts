import { Injectable } from '@nestjs/common';
import { CreateFoodHistoryDto } from './dto/create-food_history.dto';
import { UpdateFoodHistoryDto } from './dto/update-food_history.dto';
import { PrismaService } from 'nestjs-prisma';
import { error } from 'console';

@Injectable()
export class FoodHistoryService {
  constructor(private prisma: PrismaService) { }

  async findFoodOrdersForGym(gym_id: number) {
    const orders = await this.prisma.foodHistory.findMany({
      include: {
        FoodOrder: {
          select: {
            quantity: true,
            food: {
              select: {
                name: true
              }
            },
          }
        },
      },
      where: {
        gym_id: gym_id,
        collection_status: false
      }
    })
    return orders;
  }

  async findFoodsToBeCollectedForUser(user_id: number) {
    const foodsToBeCollected = await this.prisma.foodHistory.findMany({
      include: {
        FoodOrder: {
          select: {
            quantity: true,
            food: {
              select: {
                name: true
              }
            },
          }
        },
        gym: {
          select: {
            name: true,
            address: true,
            no_close: true,
            opening_hour: true,
            closing_hour: true,
            google_position: true
          }
        }
      },
      where: {
        user_id: user_id,
        collection_status: false
      }
    })
    return foodsToBeCollected;
  }

  async createHistory(createFoodHistoryDto: CreateFoodHistoryDto) {
    console.log('createFoodHistoryDto:', createFoodHistoryDto);
    const data = await this.prisma.foodHistory.create({
      data: {
        gym_id: createFoodHistoryDto.gym_id,
        user_id: createFoodHistoryDto.user_id,
        collection_status: createFoodHistoryDto.collection_status,
      }
    })
    return data;
  }

  async findOrdersForGyms(gym_id: number) {
    try {
      const data = await this.prisma.foodHistory.findMany({
        include: {
          user: {
            select: { username: true }
          },
          FoodOrder: {
            include: {
              food: {
                select: {
                  name: true,
                  image: true
                }
              }
            }
          }
        }
      })
      if (data) {
        return data
      } else {
        console.log('Error at food_history.service: ', error);
        throw new Error('No Data')
      }
    } catch (error) {
      console.log('Error at food_history.service: ', error)
      throw new Error(error)
    }
  }
}
