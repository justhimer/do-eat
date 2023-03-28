import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class CalorieTransactionService {
    constructor (private prisma: PrismaService){}

    async getUserCalories(id:number){
        const addCalorie = (await this.prisma.calorieTransaction.aggregate({
            _sum:{
                calorie:true
            },
            where:{
                user_id:id,
                transaction_type:{
                    name:"add"
                }
            }
        }))._sum.calorie || 0

        const deductCalorie = (await this.prisma.calorieTransaction.aggregate({
            _sum:{
                calorie:true
            },
            where:{
                user_id:id,
                transaction_type:{
                    name:"minus"
                }
            }
        }))._sum.calorie || 0

        const newCalorie = addCalorie - deductCalorie

        return newCalorie
    }
}
