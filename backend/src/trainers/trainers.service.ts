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
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
        
    }

}
