import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateCourseDto } from './dto/create-course.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) { }

  async allCourses() {
    return await this.prisma.courses.findMany({
      include: {
        intensity: { select: { level: true } },
        course_type: { select: { name: true } },
        gyms: {
          select: {
            name: true,
            district: { select: { id: true, name: true } },
            franchise: { select: { id: true, name: true } }
          }
        }
      },
      where: {
        courseSchedules: {
          some: {
            time: {
              gt: new Date
            }
          }
        }
      }
    })
  }

  async allCoursesInGym(gym_id: number) {
    try {
      const data = await this.prisma.courses.findMany({
        include: {
          intensity: {
            select: { level: true }
          }, course_type: {
            select: { name: true }
          }, trainers: {
            select: { name: true, icon: true }
          }
        }, where: {
          gym_id: gym_id
        }, orderBy: {
          id: 'desc'
        }
      })
      if (data) {
        const newData = []
        data.forEach(course => {
          newData.push({
            course_id: course.id,
            gym_id: course.gym_id,
            name: course.name,
            credits: course.credits,
            intensity_id: course.intensity_id,
            intensity_level: course.intensity.level,
            course_type_id: course.course_type_id,
            course_type_name: course.course_type.name,
            calories: course.calories,
            duration: course.duration,
            default_quota: course.default_quota,
            default_trainer_id: course.default_trainer_id,
            trainer_name: course.trainers.name,
            trainer_icon: course.trainers.icon,
          })
        })
        return newData
      } else {
        console.log('Error at courses.service: No Data')
        throw new Error('No Data')
      }
    } catch (error) {
      console.log('Error at courses.service: ', error)
      throw new Error(error)
    }
  }

  async createCourse(courseDetails: CreateCourseDto , gym_id:number) {
    return await this.prisma.courses.create({
      data: {
        gym_id: gym_id,
        name: courseDetails.name,
        credits: courseDetails.credits,
        intensity_id: courseDetails.intensity_id,
        course_type_id: courseDetails.course_type_id,
        calories: courseDetails.calories,
        duration: courseDetails.duration,
        default_quota: courseDetails.default_quota,
        default_trainer_id: courseDetails.default_trainer_id
      }
    })
  }

  async updateCourseInfo(courseDetails: Course) {
    try {
      const data = await this.prisma.courses.update({
        data: {
          name: courseDetails.name,
          credits: courseDetails.credits,
          intensity_id: courseDetails.intensity_id,
          course_type_id: courseDetails.course_type_id,
          calories: courseDetails.calories,
          duration: courseDetails.duration,
          default_quota: courseDetails.default_quota,
          default_trainer_id: courseDetails.default_trainer_id
        },
        where: { id: courseDetails.id },
        include: {
          course_type: {
            select: {
              name: true
            }
          },
          intensity: {
            select: {
              level: true
            }
          },
          trainers: {
            select: {
              name: true,
              icon: true
            }
          }
        }
      })
      if (data) {
        const resData = {
          calories: data.calories,
          course_id: data.id,
          course_type_id: data.course_type_id,
          course_type_name: data.course_type.name,
          credits: data.credits,
          default_quota: data.default_quota,
          default_trainer_id: data.default_trainer_id,
          duration: data.duration,
          gym_id: data.gym_id,
          intensity_id: data.intensity_id,
          intensity_level: data.intensity.level,
          name: data.name,
          trainer_icon: data.trainers.icon,
          trainer_name: data.name
        }
        return resData
      }
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }

  }

  async districtCourses(districts: Array<number>) {
    return await this.prisma.courses.findMany({
      include: {
        intensity: { select: { level: true } },
        course_type: { select: { name: true } },
        gyms: {
          select: {
            name: true,
            district: { select: { id: true, name: true } },
            franchise: { select: { id: true, name: true } }
          }
        }
      },
      where: {
        AND: [
          {
            courseSchedules: {
              some: {
                time: {
                  gt: new Date
                }
              }
            }
          },
          {
            gyms: {
              district_id: { in: districts }
            }
          }
        ]
      }
    })
  }

  async getExerciseCredit(exercise_id: number) {
    let credits = (await this.prisma.courseSchedules.findFirstOrThrow({
      where: {
        id: exercise_id
      },
      include: {
        courses: {
          select: {
            credits: true
          }
        }
      }
    })).courses.credits

    return credits
  }
}
