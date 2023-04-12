import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, HttpCode, UseGuards, Request, ParseIntPipe, Res, Redirect, HttpStatus, Req, RawBodyRequest } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { STRIPE_CLIENT } from 'src/stripe/constants';
import Stripe from 'stripe';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { SubscriptionsService } from 'src/subscriptions/subscriptions.service';
import bodyParser from 'body-parser';

const endpointSecret = 'whsec_45358f47d58c06865dcdc2db94ad1540ac3a893010588df8b9cc7cf68ac5abfc'


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
      customer_email: 'test@gmail.com' ,
      payment_method_types: ['card'],
      mode: 'payment',
      metadata: {
        user_id: 1,
        product: product
      },
      line_items: [
        { price_data:subscribedProduced,
        quantity:1,
        
      }],
      success_url: `${process.env.BACKEND_HOSTNAME}/payment/web/success/1`,
      cancel_url: `${process.env.BACKEND_HOSTNAME}/payment/web/fail/1`,
    })
    console.log("session: ", session)
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

  @Post('webhook')
  async stripeWebhook(@Req() req: RawBodyRequest<Request>){
    const raw = req.rawBody
    const sig = req.headers['stripe-signature']
    let event;

    try {
      //event = verified stripe hook
      event = this.stripe.webhooks.constructEvent(raw,sig,endpointSecret)
    } catch (error) {
      throw new Error(error)
    }

      // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    console.log('event.metadata: ', event.metadata)
    // process into database
  }

    return
  }

}
