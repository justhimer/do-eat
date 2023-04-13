import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class TrainersService {
    constructor(
        private readonly prisma: PrismaService
    ){}

    async getAllFromFranchise(franchise_id:number){
        try {
            const data = await this.prisma.trainers.findMany({
                where:{franchise_id:franchise_id}
            })
            if (data){
                return data
            }else{
                console.log('Error: no data with getAllFromFranchise: ')
                throw new Error('No Data')
            }
        } catch (error) {
            console.log('Error at getAllFromFranchise: ',error)
            throw new Error(error)
        }
        
    }

}
