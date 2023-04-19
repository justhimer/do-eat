import { Controller, Get, UseGuards, Request, Post, Delete, Param, Body, ParseIntPipe, Patch, HttpException, HttpStatus } from "@nestjs/common";
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
    async findAllByUserId(@Request() req: any) {
        const userId = req.user.id;
        const data = await this.foodCartService.findAllByUserId(userId);

        // console.log("data: ", data)
        return data
    }

    @UseGuards(AuthGuard("jwt"))
    @Post()
    async addToCart(@Request() req: any, @Body() createFoodCartDto: any) {
        // console.log('createFoodCartDto: ', createFoodCartDto);

        const userId = req.user.id;
        // console.log(userId);

        // make sure db do not has the food
        const foundFood = await this.foodCartService.findOne(createFoodCartDto.food_id, userId);
        if (foundFood) { throw new HttpException('Already Added to Cart', HttpStatus.BAD_REQUEST);}

        // then add to db
        await this.foodCartService.create(createFoodCartDto, userId);

        // console.log('added');
        return { message: 'added' }
    }

    @UseGuards(AuthGuard("jwt"))
    @Patch()
    async saveToCart(
        @Request() req: any,
        @Body() items: {
            cart_id: number
            quantity: number,
        }[]) {

        // console.log('items: ', items);

        for (let item of items) {
            await this.foodCartService.update(item);
        }

        return { message: 'saved' }
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




    // @Get('id')
    // findone(@Param('id') id: number) {
    //     return this.foodCartService.findOne(+id);
    // }

    // @UseGuards(AuthGuard("jwt"))
    // @Post(':update')
    // update(@Request() req: any, @Body() updateFoodCartDto: UpdateFoodCartDto) {
    //     const userId = req.user.id;
    //     return this.foodCartService.update(updateFoodCartDto, userId);
    // }

    @UseGuards(AuthGuard("jwt"))
    @Delete(':id')
    async delete(@Request() req: any, @Param('id', ParseIntPipe) id: number) {
        try {
            // console.log('deleting ', id)
            return await this.foodCartService.deleteCart(id);
        } catch (error) {
            console.log(error)
        }
    }
}
