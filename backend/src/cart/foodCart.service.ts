import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { FoodCart, Prisma } from '@prisma/client';
import { CreateFoodCartDto } from './dto/create-foodCart.dto';
import { UpdateFoodCartDto } from './dto/update-foodCart.dto';
@Injectable()
export class FoodCartService {
    constructor(private prisma: PrismaService) { }

    async create(createFoodCartDto: CreateFoodCartDto): Promise<FoodCart> {
        return this.prisma.foodCart.create({
            data: {
                user_id: createFoodCartDto.user_id,
                food_id: createFoodCartDto.food_id,
                quantity: createFoodCartDto.quantity
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
                users: true,
                foods: true,
            },
        });
    }
    async update(id: number, updateFoodCartDto: UpdateFoodCartDto) {
        return this.prisma.foodCart.update({
            where: { id },
            data: {
                user_id: updateFoodCartDto.user_id,
                food_id: updateFoodCartDto.food_id,
                quantity: updateFoodCartDto.quantity
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
