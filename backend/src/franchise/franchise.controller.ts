import { Controller } from '@nestjs/common';
import { FranchiseService } from './franchise.service';

@Controller('franchise')
export class FranchiseController {
  constructor(private readonly franchiseService: FranchiseService) {}
}
