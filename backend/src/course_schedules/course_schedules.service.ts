import { Injectable } from '@nestjs/common';
import { addDays } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class CourseSchedulesService {
    constructor(private readonly prisma: PrismaService) { }

    async quotaForThisCourse(exercise_id: number) {
        return (await this.prisma.courseSchedules.findFirstOrThrow({
            select: { quota: true },
            where: { id: exercise_id }
        })).quota
    }

    async allCourses() {

    }

    async someCourses(listGyms: Array<number>) {
        return await this.prisma.courseSchedules.findMany({
            
            where: {
                AND: [
                    {
                        time: {
                            gt: new Date
                        }
                    },
                    {
                        courses:{
                            gym_id: {in: listGyms}
                        }
                    }
                ]
            }
        })

    }

    async someCoursesTimed(listGyms: Array<number>,time: string) {
        console.log("gte: ", zonedTimeToUtc(time,"Asia/Hong_Kong"))
        console.log("lt: ", addDays(zonedTimeToUtc(time,"Asia/Hong_Kong"),1))
        
        const data = await this.prisma.courseSchedules.findMany({
            orderBy:[
                {time:'asc'}
            ],
            where: {
                AND: [
                    {
                        time: {
                            gte: zonedTimeToUtc(time,"Asia/Hong_Kong"),
                            lt: addDays(zonedTimeToUtc(time,"Asia/Hong_Kong"),1)
                        }
                    },
                    {
                        courses:{
                            gym_id: {in: listGyms}
                        }
                    }
                ]
            }
        })

        console.log(data)
        return data
    }


}