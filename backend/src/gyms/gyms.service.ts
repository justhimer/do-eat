import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { GymDistrictDto } from './dto/gym-district.dto';

@Injectable()
export class GymsService {
    constructor(private readonly prisma: PrismaService) { }

    async findById(id: number) {
        const foundGym = await this.prisma.gyms.findFirst({
            include: {
                franchise: {
                    select: {
                        name: true,
                        email: true
                    }
                }
            },
            where: {
                id: id,
            },
        });
        // if (!foundUser) throw new NotFoundException('User not found.');
        return foundGym;
    }

    async findByUsername(username: string) {
        const foundGym = await this.prisma.gyms.findFirst({
            where: {
                username: username,
            },
        });
        // if (!foundUser) throw new NotFoundException('User not found.');
        return foundGym;
    }

    async allGyms() {
        let data = await this.prisma.gyms.findMany({
            select: {
                id: true,
                name: true,
                franchise_id: true,
                district_id: true,
                opening_hour: true,
                closing_hour: true,
                no_close: true,
                address: true,
                google_position: true,
                district: {
                    select: {
                        name: true
                    }
                },
                franchise: {
                    select: {
                        name: true
                    }
                }
            },

        })
        return data
    }


    async allGymsId() {
        let data = await this.prisma.gyms.findMany({
            select: { id: true }
        })
        return data
    }

    async districtGyms(districts: Array<number>) {
        let data = await this.prisma.gyms.findMany({
            where: {
                district_id: { in: districts }
            },
            select: {
                id: true,
                name: true,
                franchise_id: true,
                district_id: true,
                opening_hour: true,
                closing_hour: true,
                no_close: true,
                address: true,
                google_position: true,
                district: {
                    select: {
                        name: true
                    }
                },
                franchise: {
                    select: {
                        name: true
                    }
                }
            }
        })

        return data
    }

    async districtGymsID(districts: Array<number>) {
        let data = await this.prisma.gyms.findMany({
            select: { id: true },
            where: {
                district_id: { in: districts }
            }
        })

        return data
    }


    async getFranchiseFromGymsID(gym_id: number) {
        try {
            const data = await this.prisma.gyms.findFirst({
                select: { franchise_id: true },
                where: { id: gym_id }
            })
            if (data) {
                return data.franchise_id
            } else {
                console.log('Error at gyms.service: No Data')
                throw new Error('No Data')
            }
        } catch (error) {
            console.log('Error at gyms.service: ', error)
            throw new Error(error)
        }
    }
}
