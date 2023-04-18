import { Injectable } from '@nestjs/common';
import { CreateGymFoodStockDto } from './dto/create-gym-food-stock.dto';
import { UpdateGymFoodStockDto } from './dto/update-gym-food-stock.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class GymFoodStockService {
  constructor(private readonly prisma:PrismaService){}
  async findAllForGym(gym_id:number) {
    try {
      const data = await this.prisma.gymFoodStock.findMany({
        where:{gyms_id:gym_id},
        select:{
          id:true,
          gyms_id:true,
          foods_id:true,
          quantity:true,
          foods:{
            select:{
              name:true,
              image:true,
              calories:true,
              food_types:{
                select:{
                  name:true,
                  icon:true
                }
              }
            }
          }
        }
      })
      if(data.length<=0){
        return new Error()
      }else{
        const newData = []
        data.forEach(elem=>{
          newData.push(
            {
              stock_id:elem.id,
              gym_id:elem.gyms_id,
              foods_id:elem.foods_id,
              food_name:elem.foods.name,
              food_image:elem.foods.image,
              calories: elem.foods.calories,
              food_type_name:elem.foods.food_types.name,
              food_type_icon:elem.foods.food_types.icon,
              quantity:elem.quantity
            }
          )
        })
        return newData
      }
    } catch (error) {
      
    }
  }

  async findOneForGym(gym_id:number,food_id:number){
    try {
      const data = await this.prisma.gymFoodStock.findFirst({
        where:{
          gyms_id:gym_id,
          foods_id:food_id
        }
      })
      if(!data){
        return new Error()
      }else{
        return data
      }
    } catch (error) {
      console.log(error)
      return new Error(error)
    }
  }

  async changeStockForGym(gym_id:number, body:UpdateGymFoodStockDto) {
    try {
      const data = await this.prisma.gymFoodStock.updateMany({
        data:{
          quantity:body.quantiy
        },
        where:{
          gyms_id:gym_id,
          foods_id:body.foods_id
        }
      })
      if(!data){
        return new Error()
      }else{
        return data
      }
    } catch (error) {
      console.log(error)
      return new Error(error)
    }
  }

  async addFoodForGym(gym_id:number,body:CreateGymFoodStockDto) {
    try {
      const data = await this.prisma.gymFoodStock.create({
        data:{
          gyms_id:gym_id,
          quantity:body.quantiy,
          foods_id:body.foods_id
        }
      })
      if(!data){
        return new Error()
      }else{
        return data
      }
    } catch (error) {
      console.log(error)
      return new Error(error)
    }
  }

  async removeFoodForGym(gym_id:number,food_id:number) {
    try {
      const data = await this.prisma.gymFoodStock.deleteMany({
        where:{gyms_id:gym_id,
        foods_id:food_id}
      })
      if(!data){
        return new Error()
      }else{
        return data
      }
    } catch (error) {
      console.log(error)
      return new Error(error)
    }
  }
}
