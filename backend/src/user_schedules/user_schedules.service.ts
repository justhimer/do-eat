import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CoursesService } from 'src/courses/courses.service';
import { CreateUserScheduleDto } from './dto/create-user_schedule.dto';
import { UpdateUserScheduleDto } from './dto/update-user_schedule.dto';

@Injectable()
export class UserSchedulesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly coursesService: CoursesService
    ) { }


  async getRemainingSlots(exercise_id: number) {
    let quota = (await this.prisma.courseSchedules.findFirstOrThrow({
      select: { quota: true },
      where: { id: exercise_id }
    })).quota
    console.log("quota", quota)
    let filledSlots = (await this.prisma.userSchedule.aggregate({
      _count: { course_schedule_id: true },
      where: { course_schedule_id: exercise_id }
    }))._count.course_schedule_id
    console.log("filledSlots", filledSlots)
    console.log("remaining slots:", quota - filledSlots)
    return (quota - filledSlots)
  }

  async findUserinCourse(user_id: number, exercise_id: number): Promise<boolean> {
    let foundUser = await this.prisma.userSchedule.findFirst({
      where: {
        user_id: user_id,
        course_schedule_id: exercise_id
      }
    })

    console.log("foundUser.id", foundUser)
    console.log("foundUser.id test", foundUser ? true : false)
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
      return "course subscribed"
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
      return "course subscribed"
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
