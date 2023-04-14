import { Controller, Get, UseGuards, Request, Post, Delete, Param, Body, ParseIntPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags } from "@nestjs/swagger";
import { userInfo } from "os";
import { Food } from "src/foods/entities/food.entity";
import { CreateFoodCartDto } from "./dto/create-foodCart.dto";
import { UpdateFoodCartDto } from "./dto/update-foodCart.dto";
import { FoodCartService } from "./foodCart.service";

@ApiTags("cart")
@Controller("cart")
export class FoodCartController {
    constructor(private readonly foodCartService: FoodCartService) { }

    @UseGuards(AuthGuard("jwt"))
    @Get()
    findAllByUserId(@Request() req: any) {
        const userId = req.user.id;
        return this.foodCartService.findAllByUserId(userId);
    }

    @UseGuards(AuthGuard("jwt"))
    @Post(':addItem')
    test(@Request() req: any, @Body() createFoodCartDto: any) {
        console.log(createFoodCartDto);

        const userId = req.user.id;
        this.foodCartService.create(createFoodCartDto, userId);

        console.log(userId);

        console.log('added');
        return { message: 'added' }

    }

    // @Post('addItem')
    // async addItem(@Request() req, @Body() createFoodCartDto: CreateFoodCartDto) {
    //     const foodid = req.body.id;
    //     const userId = req.user.id;
    //     const quantity = req.body.quantity;

    //     console.log(foodid);
    //     console.log(userId);
    //     console.log(quantity);
    //     return await this.foodCartService.create(createFoodCartDto);
    // }







    @Get('id')
    findone(@Param('id') id: number) {
        return this.foodCartService.findOne(+id);
    }

    @UseGuards(AuthGuard("jwt"))
    @Post(':update')
    update(@Request() req: any, @Body() updateFoodCartDto: UpdateFoodCartDto) {
        const userId = req.user.id;
        return this.foodCartService.update(updateFoodCartDto, userId);
    }

    @Delete(':delete')
    delete(@Param('id') id: number) {
        return this.foodCartService.delete(+id);
    }


}