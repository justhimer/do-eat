import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';


@Injectable()
export class CalorieTransactionService {
    constructor(private prisma: PrismaService) { }

    async getUserCalories(id: number) {
        const addCalorie = (await this.prisma.calorieTransaction.aggregate({
            _sum: {
                calorie: true
            },
            where: {
                AND:[
                    {
                        user_id: id,
                       
                    },
                    {
                        transaction_type: {
                            name: "add"
                        }
                    }
                ]
            }
        }))._sum.calorie || 0

        const deductCalorie = (await this.prisma.calorieTransaction.aggregate({
            _sum: {
                calorie: true
            },
            where: {
                AND:[
                    {
                        user_id: id,
                       
                    },
                    {
                        transaction_type: {
                            name: "minus"
                        }
                    }
                ]
            }
        }))._sum.calorie || 0

        const newCalorie = addCalorie - deductCalorie

        return newCalorie
    }

    async createTransaction(data: {
        user_id: number,
        calorie: number,
        transaction_type_id: number,
        food_history_id?: number,
        user_schedule_id?: number,
    }
    ) {
        await this.prisma.calorieTransaction.create({
            data: {
                user_id: data.user_id,
                calorie: data.calorie,
                transaction_type_id: data.transaction_type_id,
                food_history_id: data.food_history_id ? data.food_history_id : undefined,
                user_schedule_id: data.user_schedule_id ? data.user_schedule_id : undefined,
                details: ""
            }
        })
    }
}