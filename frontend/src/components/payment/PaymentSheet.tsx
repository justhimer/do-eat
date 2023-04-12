
import { useState } from 'react';

export interface StripePaymentInterface{
    paymentAmount: string;
    currency: string;
    currencyIcon: string;
    stripe_key: string;
    cardDetails:any
}
export interface CardToken{
    number: string;
    expMonth: number;
    expYear: number;
    cvc: string
}




// export async function PaymentSheet(){
//     const [cardNumber,setCardNumber] = useState(""),
//     [cardExpMonth,setCardExpMonth] = useState(NaN),
//     [cardExpYear,setCardExpYear] = useState(NaN),
//     [cardCVC,setCardCVC] = useState("")
    
//     const cardToken = await stripe.createCardToken({
//         number: cardNumber,
//         expMonth: cardExpMonth,
//         expYear: cardExpYear,
//         cvc:cardCVC
//     })
    
//     const testPurchase: StripePaymentInterface = {
//         paymentAmount: "4",
//         currency: "HKD",
//         currencyIcon: "$",
//         stripe_key: "pk_live_51MvCIeDKz6LbnKI1ZsZ2YO6TXW1OaYKec74HnL0ZwpFo9tD6u6nofOuzNdvOHVYIOgaScWyXdkTlIB888T4OQlfq00Z9sCzvCn",
//         cardDetails: cardToken
//     }




    
    
//     return <>
//     </>
// }