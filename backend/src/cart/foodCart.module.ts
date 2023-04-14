import { Global, Module } from "@nestjs/common";
import { FoodCartService } from "./foodCart.service";
import { FoodCartController } from "./foodCart.controller";
import { PrismaService } from "nestjs-prisma";

@Global()
@Module({
    controllers: [FoodCartController],
    providers: [FoodCartService, PrismaService],
    exports: [FoodCartService],
})
export class FoodCartModule { }