import NotificationStyle from "../../scss/Notification.module.scss";

import { IonPage, IonHeader, IonToolbar, IonButton, IonBackButton, IonTitle, IonContent, IonList, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonSelect, IonSelectOption, useIonToast } from "@ionic/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchAllCartItems, updateCart } from "../../api/cartAPI";
import { UserOrderItem } from "../user/UserOrderItem";
import { CartItem } from "./cartItem";
import { createFoodHistory } from "../../api/foodHistoryAPIs";
import { useParams } from "react-router-dom";

import { CheckoutDeatils } from "../../api/foodHistoryAPIs";
import { SaveOrderDetails } from "../../api/foodOrderAPI"
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { gymAll } from "../../api/gymAPIs";
import { CartSelectGymItems } from "./CartSelectGymItems";

// interface CheckoutDeatils {
//     userId: number;
//     collection_status: string;
//     gymID: string;
//     foodOrders: {
//         food_id: number;
//         quantity: number;
//     }[]
// }

export function ShoppingCart() {
    const [gymID, setGymID] = useState(0);
    const [food_id] = useState('');
    const [foodHistoryID] = useState('');
    const [count, setCount] = useState(0);
    const [amount, setAmount] = useState(0);
    const [status, setStatus] = useState('');
    const param = useParams<{ id: string }>()
    const id = parseInt(param.id)

    const [present] = useIonToast();
    const user_id = useSelector((state: RootState) => state.user.id);

    const { data: cartFoods, refetch: refetchCart } = useQuery({
        queryKey: ["cart"],
        queryFn: async () => {
            const cartItems = await fetchAllCartItems()
            console.log('cartItems: ', cartItems);
            setCount(cartItems.quantity);
            return cartItems;
        },
    })

    const { data: gyms } = useQuery({
        queryKey: ["allGyms"],
        queryFn: gymAll
    })

    function onCheckout() {
        if (gymID === 0) {
            present({
                message: "Please select a gym",
                duration: 3000,
                position: "top",
                cssClass: NotificationStyle.ionicToast,
            });
            return;
        }
        const checkoutDeatils: CheckoutDeatils = {
            user_id: user_id,
            collection_status: false,
            gym_id: gymID,
            foodOrders: cartFoods.map((cartFood: any) => {
                return {
                    cart_id: cartFood.id,
                    food_id: cartFood.food_id,
                    quantity: cartFood.quantity,
                }
            })
        };
        console.log('checkoutDeatils: ', checkoutDeatils);

        checkout.mutate(checkoutDeatils);
    }

    const checkout = useMutation(
        (checkoutDeatils: CheckoutDeatils): any => {
            const data = createFoodHistory(checkoutDeatils)
            return data;
        },
        {
            onSuccess: () => {
                refetchCart();
                setGymID(0);
                present({
                    message: "Checkout Completed",
                    duration: 3000,
                    position: "top",
                    cssClass: NotificationStyle.ionicToast,
                });
            }
        }
    )


    // const oncheckout = useMutation(
    //     (saveOrderDetails?: SaveOrderDetails): any => {
    //         let data = undefined;
    //         if (checkout) {
    //             data = createOrder()
    //         }
    //         return data;
    //     },
    //     {
    //         onSuccess: (data: SaveOrderDetails) => {
    //             const SaveOrderDetails = {
    //                 foodID: id,
    //                 quantity: count,
    //                 foodHistoryID: foodHistoryID,
    //             }
    //         }
    //     }
    // )


    const onSave = useMutation(
        (saveOrderDetails?: SaveOrderDetails): any => {
            let data = undefined;
            if (onSave) {
                data = updateCart();
            }
            return data;
        },
        {
            onSuccess: (data: SaveOrderDetails) => {
                const saveOrderDetails = {
                    userId: id,
                    quantity: count,
                    foodId: food_id,
                };
            }
        }
    )


    function cancel() {

    }

    // useEffect(() => {
    //     if (cartFoods) {
    //         setStatus(cartFoods.status);
    //     }
    // }, [cartFoods]);

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
                        <IonSelect aria-label="pickup-location" placeholder="Select Pickup Location" onIonChange={(event) => setGymID(parseInt(`${event.detail.value!}`))}>
                            {
                                gyms && gyms.length > 0 && gyms.map((gym: any, index: number) => (
                                    <CartSelectGymItems
                                        key={index}
                                        gym_id={gym.id}
                                        gym_name={gym.name}
                                    />
                                ))
                            }
                            {/* <IonSelectOption value={gymID}>PureFitness CausewayBay</IonSelectOption>
                            <IonSelectOption value={gymID}>PureFitness Central</IonSelectOption>
                            <IonSelectOption value={gymID}>PureFitness Wan Chai</IonSelectOption>
                            <IonSelectOption value={gymID}>PureFitness Tsim Sha Tsui</IonSelectOption>
                            <IonSelectOption value={gymID}>PureFitness Mong Kok</IonSelectOption>
                            <IonSelectOption value={gymID}>247Fitness CausewayBay</IonSelectOption> */}
                        </IonSelect>
                        <IonButton onClick={() => onSave.mutate}>Save Cart</IonButton>
                        <IonButton onClick={onCheckout}>Checkout</IonButton>
                        <IonButton onClick={cancel}>Cancel</IonButton>

                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage >
    )

}