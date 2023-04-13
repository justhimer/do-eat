import { Injectable } from '@nestjs/common';
import { addDays } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import { PrismaService } from 'nestjs-prisma';
import { UserSchedulesService } from 'src/user_schedules/user_schedules.service';
import { CreateCourseSchedulesDTO } from './dto/CreateCourseSchedules.dto';
import { UpdateCourseSchedulesDTO } from './dto/UpdateCourseSchedules.dto';

@Injectable()
export class CourseSchedulesService {
    constructor(private readonly prisma: PrismaService) { }

    async quotaForThisCourse(exercise_id: number) {
        return (await this.prisma.courseSchedules.findFirstOrThrow({
            select: { quota: true },
            where: { id: exercise_id }
        })).quota
    }

    async getSchedulesOfCourses(course_id:number) {
        await this.prisma.courseSchedules.findMany({
            where:{course_id: course_id},
            orderBy:{time:'desc'}
        })
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

    async getRemainingSlots(exercise_id: number) {
        let quota = await this.quotaForThisCourse(exercise_id)
    
        let filledSlots = (await this.prisma.userSchedule.aggregate({
          _count: { course_schedule_id: true },
          where: { course_schedule_id: exercise_id }
        }))._count.course_schedule_id
    
        return (quota - filledSlots)
      }

      // used in front end do-tab to get the courses available on the day
    async someCoursesTimed(listGyms: Array<number>,time: string) {
        
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
            },
            select:{
                id:true,
                course_id:true,
                quota:true,
                time:true,
                _count:{
                    select:{
                        userSchedule:true
                    }
                },
                trainers:{
                    select: {
                        name:true,
                        icon:true,
                    }
                },courses:{
                    select:{
                        intensity:{
                            select:{
                                level:true
                            }
                        },gyms:{
                            select:{
                                name:true,
                                    franchise:{
                                    select:{
                                        name:true
                                    }
                                }
                            }
                        },course_type:{
                            select:{
                                name:true,
                                id:true
                            }
                        },
                        name:true,
                        credits:true,
                        calorise:true,
                        duration:true
                    }
                }
            }
        })

        if (data.length == 0){
            return data
          }else{
            let newArray = []
            
            data.map(async elem=>{
                newArray.push(
                        {
                          this_id:elem.id,
                          filled: elem._count.userSchedule,
                          course_id:elem.course_id,
                          name:elem.courses.name,
                          duration:elem.courses.duration,
                          level:elem.courses.intensity.level,
                          quota:elem.quota,
                          time:elem.time,
                          calorise:elem.courses.calorise,
                          credits:elem.courses.credits,
                          franchise:elem.courses.gyms.franchise.name,
                          gym:elem.courses.gyms.name,
                          trainer_icon:elem.trainers.icon,
                          trainer_name:elem.trainers.name,
                          course_type_id: elem.courses.course_type.id,
                          course_type_name:elem.courses.course_type.name,
                          
                        }
                      )
            })
            return newArray
          }
    }

    // for use in frontend do-tab horizontal date picker
    async getDatesWithCourses(listGyms: Array<number>){
        const data = await this.prisma.courseSchedules.findMany({
            select: {
                time:true
            },
            orderBy: [
                {time:'asc'}
            ],
            where:{
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
        return data
    }

    // used in userSchedule cancel course, to check if there is at least 24 hour difference between now and course start
    async getDateTime(courseSchedule_id:number){
        try {
            const data = await this.prisma.courseSchedules.findFirst({
                select:{time:true},
                where:{id:courseSchedule_id}
            })
            if (data){
                return String(data.time)
            }else{
                console.log('No data at getCourseDate')
                throw new Error('no data')
            }
        } catch (error) {
            console.log('error at course_schedules.services: ', error)
            throw new Error(error)
        }
    }

    // for gyms to create a new timeslot from course
    async createNewCourseTime(body: CreateCourseSchedulesDTO){
        try {
            const data = await this.prisma.courseSchedules.create({
                data:{
                    course_id: body.course_id,
                    trainer_id: body.trainer_id,
                    quota: body.quota,
                    time: body.time 
                }
            })
            if (data){
                return data
            }else{
                console.log('error at course_schedules.services: ')
                throw new Error()
            }
        } catch (error) {
            console.log('error at course_schedules.services: ', error)
            throw new Error(error)
        }
    }

    // for gyms to edit a new timeslot from course
    async updateCourseTime(body: UpdateCourseSchedulesDTO){
        try {
            const data = await this.prisma.courseSchedules.update({
                data:{
                    course_id: body.course_id,
                    trainer_id: body.trainer_id,
                    quota: body.quota,
                    time: body.time 
                },where : {
                    id : body.id
                }
            })
            if (data){
                return data
            }else{
                console.log('error at course_schedules.services: ')
                throw new Error()
            }
        } catch (error) {
            console.log('error at course_schedules.services: ', error)
            throw new Error(error)
        }
    }
}