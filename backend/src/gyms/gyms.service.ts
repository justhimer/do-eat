import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { GymDistrictDto } from './dto/gym-district.dto';

@Injectable()
export class GymsService {
    constructor(private readonly prisma: PrismaService) { }

    async allGyms() {
        let data = await this.prisma.gyms.findMany({
            include: {
                district: {
                    select: {
                        name: true
                    }
                },
                franchise:{
                    select:{
                        name:true
                    }
                }
            }
        })
        console.log(data)
        return data
    }


    async allGymsId() {
        let data = await this.prisma.gyms.findMany({
            select: { id: true }
        })
        console.log(data)
        return data
    }

    async districtGyms(districts: Array<number>){
        let data = await this.prisma.gyms.findMany({
            where:{
                district_id: {in: districts}
            },
            include: {
                district: {
                    select: {
                        name: true
                    }
                },
                franchise:{
                    select:{
                        name:true
                    }
                }
            }
        })

        return data
    }

    async districtGymsID(districts: Array<number>) {
        let data = await this.prisma.gyms.findMany({
            select:{id:true},
            where:{
                district_id: {in: districts}
            }
        })

        return data
    }

}
