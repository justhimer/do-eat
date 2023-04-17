import { OmitType, PartialType } from "@nestjs/swagger";
import { GymFoodStock } from "../entities/gym-food-stock.entity";

export class CreateGymFoodStockDto extends OmitType(GymFoodStock,['id'] as const){}
