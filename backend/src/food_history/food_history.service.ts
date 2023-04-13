import { Injectable } from '@nestjs/common';
import { CreateFoodHistoryDto } from './dto/create-food_history.dto';
import { UpdateFoodHistoryDto } from './dto/update-food_history.dto';
import { PrismaService } from 'nestjs-prisma';
import { error } from 'console';

@Injectable()
export class FoodHistoryService {
  constructor(private prisma: PrismaService) { }

  async findAllNotCollected(user_id: number) {
    const foods = await this.prisma.foodHistory.findMany({
      select: {
        
      },
      where: {
        user_id: user_id,
        collection_status: false
      }
    })
    return `This action returns all foodHistory`;
  }
  
  create(createFoodHistoryDto: CreateFoodHistoryDto) {
    return 'This action adds a new foodHistory';
  }

  async findOrdersForGyms(gym_id: number){
    try {
      const data = await this.prisma.foodHistory.findMany({
        include:{
          user:{
            select:{username:true}
          },
          FoodOrder:{
            include:{
              food:{
                select:{
                  name:true,
                  image:true
                }
              }
            }
          }
        }
      })
      if(data){
        return data
      }else{
        console.log('Error at food_history.service: ',error);
        throw new Error('No Data')
      }
    } catch (error) {
      console.log('Error at food_history.service: ', error)
      throw new Error(error)
    }
  }
}
