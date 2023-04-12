import { Injectable } from '@nestjs/common';
import { int } from 'aws-sdk/clients/datapipeline';
import { addDays } from 'date-fns';
import { PrismaService } from 'nestjs-prisma';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PaymentService {
  constructor(private readonly primsa: PrismaService,
    private readonly userService: UsersService
    ){}

  async create(user_id: int, plan_id:int, event_id:string) {

    const planDetails = await this.primsa.subPlans.findFirst({
      where:{id:plan_id}
    })

    if (planDetails && planDetails.unlimited){
      const createPremiumTransactionRecord = await this.primsa.users.update({
        data:{
          subscribed:true,
          sub_plan_id:plan_id,
          sub_plan_start:new Date,
          sub_plan_end: addDays(new Date, planDetails.duration),
          subPlanTransactions:{
            create:{
              event_id:event_id,
              sub_plans_id:plan_id,
            }
          }
        },
        where:{
          id:user_id
        }
      })
      return true
    }else if (planDetails){
      const userData = await this.userService.findById(user_id)
      if (userData.subscribed){
        const createBasicTransactionRecord = await this.primsa.users.update({
          data:{
            subscribed:true,
            sub_plan_id:plan_id,
            sub_plan_end: addDays(new Date(userData.sub_plan_start), planDetails.duration),
            subPlanTransactions:{
              create:{
                event_id:event_id,
                sub_plans_id:plan_id,
              }
            },
            CreditTransaction:{
              create:{
                credit:planDetails.credits,
                credit_transaction_type_id:1, //hard code add transaction type
                details: `Joined ${planDetails.name} plan with ${planDetails.credits} credits`
              }
            }
          },
          where:{
            id:user_id
          }
        })
        return true
      }else{
        const updateBasicTransactionRecord = await this.primsa.users.update({
          data:{
            subscribed:true,
            sub_plan_id:plan_id,
            sub_plan_start:new Date,
            sub_plan_end: addDays(new Date, planDetails.duration),
            subPlanTransactions:{
              create:{
                event_id:event_id,
                sub_plans_id:plan_id,
              }
            },
            CreditTransaction:{
              create:{
                credit:planDetails.credits,
                credit_transaction_type_id:1, //hard code add transaction type
                details: `Joined ${planDetails.name} plan with ${planDetails.credits} credits`
              }
            }
          },
          where:{
            id:user_id
          }
        })
        return true
      }

    }else{
      return false
    }  
  }
  async check(event_id: string){
    const data = await this.primsa.subPlansTransactions.findFirst({
      where:{
        event_id : event_id
      }
    }
    )
    //checks to see if event_id is on record. if it exists, return false
    if (data){
      return true
    }else{
      return false
    }
  }
}
