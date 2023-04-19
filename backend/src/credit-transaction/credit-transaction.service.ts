import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class CreditTransactionService {
    constructor (private prisma: PrismaService){}

    async getUserCredits(id:number){
       const addCredit = (await this.prisma.creditTransaction.aggregate({
        _sum: {
            credit: true
        },where:{
            AND:[{
                user_id:id
            },{                credit_transaction_type: {
                name:"add"
            }}]
            
        }
       }))._sum.credit || 0
       
       const deductCredit = (await this.prisma.creditTransaction.aggregate({
        _sum: {
            credit: true
        },where:{
            AND:[{
                user_id:id
            },{                credit_transaction_type: {
                name:"minus"
            }}]

        }
       }))._sum.credit || 0

       const newCredit = addCredit - deductCredit

       return newCredit
    }
}
