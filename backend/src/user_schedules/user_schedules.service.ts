import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CoursesService } from 'src/courses/courses.service';
import { CourseSchedulesService } from 'src/course_schedules/course_schedules.service';
import { CreateUserScheduleDto } from './dto/create-user_schedule.dto';
import { UpdateUserScheduleDto } from './dto/update-user_schedule.dto';

@Injectable()
export class UserSchedulesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly coursesService: CoursesService,
    private readonly courseScheduleService: CourseSchedulesService
  ) { }

  async findAllUserCourses(user_id: number) {
    let courses = await this.prisma.userSchedule.findMany({
      select: {
        attendance_type: true,
        course_schedule: {
          select: {
            id: true,
            time: true,
            courses: {
              select: {
                name: true,
                duration: true,
                gyms : {
                  select: {
                    name: true,
                    address: true
                  }
                }
              }
            }
          }
        }
      },
      where: {
        user_id: user_id,
      }
    })
    return courses;
  }

  async getRemainingSlots(exercise_id: number) {
    let quota = await this.courseScheduleService.quotaForThisCourse(exercise_id)

    let filledSlots = (await this.prisma.userSchedule.aggregate({
      _count: { course_schedule_id: true },
      where: { course_schedule_id: exercise_id }
    }))._count.course_schedule_id

    return (quota - filledSlots)
  }

  async findUserinCourse(user_id: number, exercise_id: number): Promise<boolean> {
    let foundUser = await this.prisma.userSchedule.findFirst({
      where: {
        user_id: user_id,
        course_schedule_id: exercise_id
      }
    })
    return foundUser ? true : false
  }


  //#region add course and premium add course 
  async addCourse(user_id: number, exercise_id: number) {
    try {
      const addToCourse = this.prisma.userSchedule.create({
        data: {
          user_id: user_id,
          course_schedule_id: exercise_id,
          attendance_type_id: 1,
          creditTransaction: {
            create: {
              user_id: user_id,
              credit: await this.coursesService.getExerciseCredit(exercise_id),
              details: `joined course`,
              credit_transaction_type_id: 2
            }
          }
        },
      })

      await this.prisma.$transaction([addToCourse])
      return { message: "course subscribed" }
    } catch (error) {
      console.log(error);
      return error
    }
  }

  async addCoursePremium(user_id: number, exercise_id: number) {
    try {
      const addToCourse = this.prisma.userSchedule.create({
        data: {
          user_id: user_id,
          course_schedule_id: exercise_id,
          attendance_type_id: 1,
          creditTransaction: {
            create: {
              user_id: user_id,
              credit: 0,
              details: `joined course as Premium User`,
              credit_transaction_type_id: 2
            }
          }
        },
      })

      await this.prisma.$transaction([addToCourse])
      return { message: "course subscribed" }
    } catch (error) {
      console.log(error);
      return error
    }

  }
  //#endregion

  async returnUserIdCourse(registered_id: number) {
    return (await this.prisma.userSchedule.findFirst({
      where: { id: registered_id }
    })).user_id
  }

  async deleteUserFromCourse(registered_id: number) {
    try {
      const deleteFromCreditTransaction = this.prisma.creditTransaction.deleteMany({
        where: {
          user_schedule_id: registered_id
        }
      })

      const deleteFromUserSchedule = this.prisma.userSchedule.delete({
        where: {
          id: registered_id
        }
      })

      await this.prisma.$transaction([deleteFromCreditTransaction, deleteFromUserSchedule])
      return "Deleted course registration"
    } catch (error) {
      console.log(error)
      return error
    }
  }
}
