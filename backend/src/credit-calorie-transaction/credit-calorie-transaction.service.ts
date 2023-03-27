import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class CreditCalorieTransactionService {
    constructor (private prisma: PrismaService){}

    async updateUserCredits(id:number){
        console.log('diu')
       const addCredit = (await this.prisma.creditTransaction.aggregate({
        _sum: {
            credit: true
        },where:{
            user_id:id,
            credit_transaction_type: {
                name:"add"
            }
        }
       }))._sum.credit || 0
       console.log("addCredit ", addCredit);
       
       const deductCredit = (await this.prisma.creditTransaction.aggregate({
        _sum: {
            credit: true
        },where:{
            user_id:id,
            credit_transaction_type: {
                name:"minus"
            }
        }
       }))._sum.credit || 0
       console.log("deductCredit ", deductCredit);

       const newCredit = addCredit - deductCredit

       console.log("newCredit ", newCredit);
       await this.prisma.users.update({
        where:{id:id},
        data:{
            credits: newCredit
        }
       })
    }

    async getUserCredit(id:number){
        const userCredits = await this.prisma.users.findFirstOrThrow({
            select:{credits:true},
            where:{id:id}
        })
        console.log('dim gun')
        return userCredits.credits
    }

    async updateUserCalories(id:number){
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

        await this.prisma.users.update({
            where:{id:id},
            data:{
                calories:newCalorie
            }
        })
    }

    async getUserCalorie(id:number){
        const userCalorie = await this.prisma.users.findFirstOrThrow({
            select:{calories:true},
            where:{
                id:id
            }
        })
        return userCalorie.calories
    }
}


