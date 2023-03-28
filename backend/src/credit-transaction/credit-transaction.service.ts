import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class CreditTransactionService {
    constructor (private prisma: PrismaService){}

    async getUserCredits(id:number){
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
       return newCredit
    }
}
