import { IonPage, IonHeader, IonToolbar, IonButton, IonBackButton, IonTitle, IonContent, IonList, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from "@ionic/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchAllCartItems } from "../../api/cartAPI";
import { UserOrderItem } from "../user/UserOrderItem";
import { CartItem } from "./cartItem";

export function ShoppingCart() {

    const [count, setCount] = useState(0);
    const [amount, setAmount] = useState(0);

    const { data: cartFoods } = useQuery({
        queryKey: ["cart"],
        queryFn: async () => {
            const cartItems = await fetchAllCartItems()
            console.log('cartItems: ', cartItems);
            setCount(cartItems.quantity);
            return cartItems;
        },
    })

    function onCheckout() {

    }

    function onSave() {

    }

    return (
        <IonPage >
            <IonHeader >
                <IonToolbar >
                    <IonButton slot="start">
                        <IonBackButton default-href="/"></IonBackButton>
                    </IonButton>
                    <IonTitle>Cart</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Card Title</IonCardTitle>
                        <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonList>

                            {
                                cartFoods && cartFoods.length > 0 && cartFoods.map((cartFood: any, index: number) => (
                                    <CartItem
                                        key={index}
                                        name={cartFood.foods.name}
                                        quantity={cartFood.quantity}
                                        calories={cartFood.foods.calories}
                                    // image={cartFood.foods.image}
                                    />
                                ))
                            }

                        </IonList>

                        <IonButton onClick={onSave}>Save Cart</IonButton>
                        <IonButton onClick={onCheckout}>Checkout</IonButton>

                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage >
    )

}