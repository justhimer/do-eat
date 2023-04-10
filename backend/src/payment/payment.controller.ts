import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, HttpCode, UseGuards, Request, ParseIntPipe } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { STRIPE_CLIENT } from 'src/stripe/constants';
import Stripe from 'stripe';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('stripe_payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService,
    @Inject(STRIPE_CLIENT) private stripe: Stripe
    ) {}


  // @UseGuards(AuthGuard('jwt'))
  @Post('payment-sheet/:product')
  async paymentSheetCreate(@Request() req, @Param('product', ParseIntPipe) product : number){
     // Use an existing Customer ID if this is a returning customer.
  const customer = await this.stripe.customers.create();
  const ephemeralKey = await this.stripe.ephemeralKeys.create(
    {customer: customer.id},
    {apiVersion: '2022-11-15'}    
  );
  const paymentIntent = await this.stripe.paymentIntents.create({
    amount: 1099,
    currency: 'HKD',
    customer: customer.id,
    automatic_payment_methods: {
      enabled: true,
    },
  });

  return{
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey: process.env.STRIPE_API_PUBLISH_KEY
  }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('web/session/:product')
  async create(@Request() req, @Param('product', ParseIntPipe) product : number) {
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        { price_data:{
          currency:"HKD",
          product_data:{
            name: "basic"
          },
          unit_amount_decimal:"400"
        },
        quantity:1,
        
      }],
      success_url: `${process.env.REACT_PUBLIC_HOSTNAME}/test_success`,
      cancel_url: `${process.env.REACT_PUBLIC_HOSTNAME}/test_failure`,
    })
    return {url:session.url}
  }

  @Get()
  findAll() {
    return this.stripe.customers.list();
  }

}
