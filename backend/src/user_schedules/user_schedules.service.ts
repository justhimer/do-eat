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

  async findUniqueUserScheduleID(user_id: number, course_schedule_id: number, gym_id: number) {
    const user_schedule_id = await this.prisma.userSchedule.findFirst({
      select: {
        id: true
      },
      where: {
        user_id: user_id,
        course_schedule_id: course_schedule_id,
        course_schedule: {
          courses: {
            gym_id: gym_id
          }
        }
      }
    })
    return user_schedule_id.id;
  }

  async findAllUserCoursesPending(user_id: number) {
    const courses = await this.prisma.userSchedule.findMany({
      select: {
        attendance_type: true,
        course_schedule: {
          select: {
            id: true,
            time: true,
            courses: {
              select: {
                name: true,
                course_type: {
                  select: {
                    name: true
                  }
                },
                duration: true,
                gyms: {
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
        attendance_type_id: 1
      }
    })
    return courses;
  }

  async findAllUserCoursesAttendedOrAbsent(user_id: number) {
    const courses = await this.prisma.userSchedule.findMany({
      select: {
        attendance_type: true,
        course_schedule: {
          select: {
            id: true,
            time: true,
            courses: {
              select: {
                name: true,
                course_type: {
                  select: {
                    name: true
                  }
                },
                duration: true,
                gyms: {
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
        OR: [
          { attendance_type_id: 2 },
          { attendance_type_id: 3 }
        ]
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

  async getFilledSlots(exercise_id: number) {

    let filledSlots = (await this.prisma.userSchedule.aggregate({
      _count: { course_schedule_id: true },
      where: { course_schedule_id: exercise_id }
    }))._count.course_schedule_id

    return filledSlots;
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
    try {
      const data = await this.prisma.userSchedule.findFirst({
        where: { id: registered_id }
      })
      if (data) {
        return data
      } else {
        throw new Error('no data')
      }
    } catch (error) {
      console.log('error at user_schedules.service: ', error)
      throw new Error(error)
    }


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
      return new Error(error)
    }
  }

  async takeAttendance(user_schedule_id: number) {
    try {
      return await this.prisma.userSchedule.update({
        where: {
          id: user_schedule_id
        },
        data: {
          attendance_type_id: 2
        }
      });
    } catch (error) {
      return new Error(error)
    }
  }
}
