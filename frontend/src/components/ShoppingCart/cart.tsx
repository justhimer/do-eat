import { IonPage, IonHeader, IonToolbar, IonButton, IonBackButton, IonTitle, IonContent, IonList, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonSelect, IonSelectOption } from "@ionic/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { cleanup } from "@testing-library/react";
import { clear } from "console";
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

    function cancel() {

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
                        <IonSelect aria-label="districts" placeholder="Select districts">
                            <IonSelectOption value="Pure">PureFitness CausewayBay</IonSelectOption>
                            <IonSelectOption value="Pure">PureFitness Central</IonSelectOption>
                            <IonSelectOption value="Pure">PureFitness Wan Chai</IonSelectOption>
                            <IonSelectOption value="Pure">PureFitness Tsim Sha Tsui</IonSelectOption>
                            <IonSelectOption value="Pure">PureFitness Mong Kok</IonSelectOption>
                            <IonSelectOption value="247">247Fitness CausewayBay</IonSelectOption>
                        </IonSelect>
                        <IonButton onClick={onSave}>Save Cart</IonButton>
                        <IonButton onClick={onCheckout}>Checkout</IonButton>
                        <IonButton onClick={cancel}>Cancel</IonButton>

                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage >
    )

}