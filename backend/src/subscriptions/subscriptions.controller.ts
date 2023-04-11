import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { ApiTags } from '@nestjs/swagger';
import { isError } from 'lodash';
import { error } from 'console';

@ApiTags('subscriptions')
@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Get()
  findAll() {
    return this.subscriptionsService.findAll();
  }

  @Get('/one/:id')
  findOne(@Param('id', ParseIntPipe) id : number){
    try {
    const data =  this.subscriptionsService.findOne(id)
    return data
    } catch (error) {
     console.log(error)
     throw new HttpException('test', HttpStatus.BAD_REQUEST) 
    }
  }

  }
