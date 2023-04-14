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
import { UsersService } from 'src/users/users.service';

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET


@ApiTags('stripe_payment')
@Controller('payment')
export class PaymentController {
  constructor(
    private readonly subscriptionsService: SubscriptionsService,
    private readonly paymentService: PaymentService,
    private readonly usersService: UsersService,
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
  async create(@Req() req, @Param('product', ParseIntPipe) product : number) {
    const id = req.user.id
    const subscriptionData = await this.subscriptionsService.findOne(product)
    const subscribedProduced = {
            currency:"hkd",
            product_data:{
              name: `${subscriptionData.name} plan`,
              description: subscriptionData.unlimited ? `Unlimited credit plan for ${subscriptionData.duration}` : `Add ${subscriptionData.credits} credits and enjoy our services for another ${subscriptionData.duration} days` 
            },
            unit_amount_decimal: String(subscriptionData.fee*100)
    }
    const foundEmail = await this.usersService.returnEmail(id)

    const session = await this.stripe.checkout.sessions.create({
      customer_email: foundEmail ,
      payment_method_types: ['card'],
      mode: 'payment',
      metadata: {
        user_id: `${id}`,
        product: `${product}`
      },
      line_items: [
        { price_data:subscribedProduced,
        quantity:1,
        
      }],
      success_url: `${process.env.REACT_PUBLIC_HOSTNAME}/home-tab`,
      cancel_url: `${process.env.REACT_PUBLIC_HOSTNAME}/user-subscription`,
    })
    
    return {url:session.url}
  }

  @Post('webhook')
  async stripeWebhook(@Req() req: RawBodyRequest<Request>){
    console.log('webhook received')
    const metadata = req.body['data']['object']['metadata']
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
    // process into database
    const exist = await this.paymentService.check(event.id)
    //exits api if we processed event before
    if (exist){
      return //no error needed as we do not need to log repeated hooks
    }
    const addingData = await this.paymentService.create(Number(metadata.user_id),Number(metadata.product),event.id)
    if (addingData){
      console.log('successfully created new payment record')
      return
    }else{
      throw new Error("error with creating new payment record")
    }
  }
    return
  }

}
