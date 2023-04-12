import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, HttpCode, UseGuards, Request, ParseIntPipe, Res, Redirect, HttpStatus } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { STRIPE_CLIENT } from 'src/stripe/constants';
import Stripe from 'stripe';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { SubscriptionsService } from 'src/subscriptions/subscriptions.service';

@ApiTags('stripe_payment')
@Controller('payment')
export class PaymentController {
  constructor(
    private readonly subscriptionsService: SubscriptionsService,
    private readonly paymentService: PaymentService,
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

  // @UseGuards(AuthGuard('jwt'))
  @Post('web/session/:product')
  async create(@Request() req, @Param('product', ParseIntPipe) product : number) {

    // const id = req.id
    const subscriptionData = await this.subscriptionsService.findOne(product)
    const subscribedProduced = {
            currency:"hkd",
            product_data:{
              name: `${subscriptionData.name} plan`,
              description: subscriptionData.unlimited ? `Unlimited credit plan for ${subscriptionData.duration}` : `Add ${subscriptionData.credits} credits and enjoy our services for another ${subscriptionData.duration} days` 
            },
            unit_amount_decimal: String(subscriptionData.fee*100)
    }

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        { price_data:subscribedProduced,
        quantity:1,
        
      }],
      success_url: `${process.env.BACKEND_HOSTNAME}/payment/web/success/1`,
      cancel_url: `${process.env.BACKEND_HOSTNAME}/payment/web/fail/1`,
    })
    
    return {url:session.url}
  }

  @Redirect()
  @Get('web/success/:id')
  successfulStripe() {
    
    return {statusCode: HttpStatus.FOUND, url:`${process.env.REACT_PUBLIC_HOSTNAME}/user-subscription`}
  }

  @Redirect()
  @Get('web/fail/:id')
  failedStripe() {

    return {statusCode: HttpStatus.FOUND, url:`${process.env.REACT_PUBLIC_HOSTNAME}/user-subscription`}
  }

}
