import { PartialType} from '@nestjs/swagger';
import { Dllm } from '../entities/dllm.entities';


export class diuDto extends PartialType(Dllm) {}
