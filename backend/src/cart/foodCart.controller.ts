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
    @Post('addItem')
    test(@Request() req: any, @Body() createFoodCartDto: any) {
        console.log(createFoodCartDto);
        const userId = req.user.id;
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

    @Get(':id')
    findone(@Param('id') id: number) {
        return this.foodCartService.findOne(+id);
    }

    @Get()
    findAllByUserId(@Param('id') id: number) {
        return this.foodCartService.findAllByUserId(+id);
    }

    @Post(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateFoodCartDto: UpdateFoodCartDto) {
        return this.foodCartService.update(id, updateFoodCartDto);
    }

    @Delete('id')
    delete(@Param('id') id: number) {
        return this.foodCartService.delete(+id);
    }


}