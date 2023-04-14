import { OmitType } from "@nestjs/swagger";
import { Trainers } from "../entities/trainers.entity";

export class CreateTrainersDTO extends OmitType(Trainers, ['franchise_id','id'] as const){

}