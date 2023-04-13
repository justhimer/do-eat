import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateTrainersDTO } from './dto/create-trainers.dto';
import { Trainers } from './entities/trainers.entity';

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

    async createTrainer(trainer:CreateTrainersDTO,franchise_id:number){
        try {
            const data = await this.prisma.trainers.create({
                data:{
                    franchise_id:franchise_id,
                    name: trainer.name,
                    icon: trainer.icon,
                    certifications: trainer.certification
                }
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

    async updateTrainer(trainer:Trainers,franchise_id:number){
        try {
            const data = await this.prisma.trainers.update({
                data:{
                    name: trainer.name,
                    icon: trainer.icon,
                    certifications: trainer.certification
                },
                where:{
                    id:trainer.id
                }
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
