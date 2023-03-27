import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class CreditCalorieTransactionService {
    constructor (private prisma: PrismaClient){}

    async updateUserCredits(id:number){
       const addCredit = await this.prisma.creditTransaction.aggregate({
        _sum: {
            credit: true
        },where:{
            user_id:id,
            credit_transaction_type: {
                name:"add"
            }
        }
       })
       console.log("addCredit ", addCredit);
       
       const deductCredit = await this.prisma.creditTransaction.aggregate({
        _sum: {
            credit: true
        },where:{
            user_id:id,
            credit_transaction_type: {
                name:"minus"
            }
        }
       })
       console.log("deductCredit ", deductCredit);

       const newCredit = addCredit._sum.credit - deductCredit._sum.credit

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
        return userCredits.credits
    }

    async updateUserCalories(id:number){
        const addCalorie = await this.prisma.calorieTransaction.aggregate({
            _sum:{
                calorie:true
            },
            where:{
                user_id:id,
                transaction_type:{
                    name:"add"
                }
            }
        })

        const deductCalorie = await this.prisma.calorieTransaction.aggregate({
            _sum:{
                calorie:true
            },
            where:{
                user_id:id,
                transaction_type:{
                    name:"minus"
                }
            }
        })

        const newCalorie = addCalorie._sum.calorie - deductCalorie._sum.calorie

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


