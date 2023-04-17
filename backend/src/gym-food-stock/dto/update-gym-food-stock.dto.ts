import { OmitType } from "@nestjs/swagger";
import { GymFoodStock } from "../entities/gym-food-stock.entity";

export class UpdateGymFoodStockDto extends OmitType(GymFoodStock,['id','gyms_id'] as const){}