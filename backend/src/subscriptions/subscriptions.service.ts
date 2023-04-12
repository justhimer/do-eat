import { Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class SubscriptionsService {
  constructor(private readonly prisma:PrismaService){}

  async findAll() {

    const data = await this.prisma.subPlans.findMany({
      
    })
    console.log('in services', data)
    return data;
  }

  async findOne(id: number) {
    const data = await this.prisma.subPlans.findFirst({
      where:{
        id: id
      }
    })
    if (data){
      return data
    }else{
      throw new Error('no data')
    }
  }

}
