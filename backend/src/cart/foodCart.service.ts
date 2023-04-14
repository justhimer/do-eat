import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { FoodCart, Prisma } from '@prisma/client';
import { CreateFoodCartDto } from './dto/create-foodCart.dto';
import { UpdateFoodCartDto } from './dto/update-foodCart.dto';
@Injectable()
export class FoodCartService {
    constructor(private prisma: PrismaService) { }

    async create(createFoodCartDto: CreateFoodCartDto, user_id: number): Promise<FoodCart> {
        return this.prisma.foodCart.create({
            data: {
                user_id: user_id,
                food_id: parseInt(createFoodCartDto.food_id),
                quantity: parseInt(createFoodCartDto.quantity)
            }

        });
    }

    async findOne(id: number): Promise<FoodCart | null> {
        return this.prisma.foodCart.findUnique({
            where: {
                id,
            },
            include: {
                users: true,
                foods: true,
            },
        });
    }

    async findAllByUserId(userId: number): Promise<FoodCart[]> {
        return this.prisma.foodCart.findMany({
            where: {
                user_id: userId,
            },
            include: {
                foods: {
                    select: {
                        name: true,
                        calories: true,
                        image: true
                    }
                },
            },
        });
    }
    async update(updateFoodCartDto: UpdateFoodCartDto, user_id: number) {
        return this.prisma.foodCart.update({
            where: { id: user_id },
            data: {
                user_id: user_id,
                food_id: parseInt(updateFoodCartDto.food_id),
                quantity: parseInt(updateFoodCartDto.quantity)
            }
        });
    }

    async delete(id: number): Promise<FoodCart> {
        return this.prisma.foodCart.delete({
            where: {
                id,
            },
            include: {
                users: true,
                foods: true,
            },
        });
    }
}
