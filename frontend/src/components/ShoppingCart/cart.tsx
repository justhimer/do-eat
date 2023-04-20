import NotificationStyle from "../../scss/Notification.module.scss";
import AppStyle from "../../scss/App.module.scss"
import Fooddetailsstyle from '../../scss/Fooddetails.module.scss'

import { IonPage, IonHeader, IonToolbar, IonButton, IonBackButton, IonTitle, IonContent, IonList, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonSelect, IonSelectOption, useIonToast, useIonViewWillEnter, IonIcon, IonLabel, IonCol, IonGrid, IonRow, useIonViewWillLeave, IonRefresher, IonRefresherContent, RefresherEventDetail } from "@ionic/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { deleteCart, fetchAddItem, fetchAllCartItems, OrderDetails, updateCart } from "../../api/cartAPI";
import { UserOrderItem } from "../user/UserOrderItem";
import { CartItem } from "./cartItem";
import { createFoodHistory } from "../../api/foodHistoryAPIs";
import { useParams } from "react-router-dom";
import { CheckoutDeatils } from "../../api/foodHistoryAPIs";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { gymAll } from "../../api/gymAPIs";
import { CartSelectGymItems } from "./CartSelectGymItems";
import { flameSharp } from "ionicons/icons";
import { fetchCalories } from "../../api/calorieTransactionAPIs";
import { NoResult } from "../NoResult";

// interface CheckoutDeatils {
//     userId: number;
//     collection_status: string;
//     gymID: string;
//     foodOrders: {
//         food_id: number;
//         quantity: number;
//     }[]
// }

interface Count {
    id: number,
    calorie: number,
    quantity: number
}

export function ShoppingCart() {
    const [gymID, setGymID] = useState(0);
    const [food_id] = useState(0);
    const [counts, setCounts] = useState<Count[]>([]);
    const [totalCalories, setTotalCalories] = useState(0);

    const [present] = useIonToast();
    const user_id = useSelector((state: RootState) => state.user.id);

    const isUserLoggedIn = useSelector((state: RootState) => state.user.isAuthenticated);

    const { data: myCalories, refetch: refetchMyCalories } = useQuery({
        queryKey: ["my_calories"],
        queryFn: fetchCalories,
    });

    const { data: cartFoods, isLoading, refetch: refetchCart } = useQuery({
        queryKey: ["cart"],
        queryFn: async () => {
            const cartItems = await fetchAllCartItems()
            // console.log('cartItems: ', cartItems);
            let newCounts = [];
            for (let cartItem of cartItems) {
                newCounts.push({
                    id: cartItem.id,
                    calorie: cartItem.foods.calories,
                    quantity: cartItem.quantity
                })
            }
            // console.log('newcounts: ', newCounts)
            setCounts(newCounts);
            let totalC = 0;
            for (let count of newCounts) {
                totalC += count.calorie * count.quantity;
            }
            setTotalCalories(totalC);
            return cartItems;
        },
    })

    const { data: gyms } = useQuery({
        queryKey: ["allGyms"],
        queryFn: gymAll
    })

    function changeQuantity(id: number, newQuantity: number) {
        let copyCounts = counts;
        for (let count of copyCounts) {
            if (count.id === id) {
                count.quantity = newQuantity;
            }
        }
        setCounts(copyCounts);
    }

    function changeTotalQuantity() {
        let totalC = 0;
        for (let count of counts) {
            totalC += count.calorie * count.quantity;
        }
        setTotalCalories(totalC);
    }

    function onCheckout() {
        if (myCalories < totalCalories) {
            present({
                message: "Not enough Calories",
                duration: 1000,
                position: "top",
                cssClass: NotificationStyle.ionicToast,
            });
            return;
        }
        if (gymID === 0) {
            present({
                message: "Please select a gym",
                duration: 1000,
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
                let quantity = 0;
                for (let count of counts) {
                    if (count.id === cartFood.id) {
                        quantity = count.quantity;
                    }
                }
                return {
                    cart_id: cartFood.id,
                    food_id: cartFood.food_id,
                    quantity: quantity,
                }
            })
        };
        // console.log('checkoutDeatils: ', checkoutDeatils);
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
                    message: "Foods Purchased",
                    duration: 1000,
                    position: "top",
                    cssClass: NotificationStyle.ionicToast,
                });
            }
        }
    )

    function onSave() {
        const items = cartFoods;
        const newItems = items.map((item: any) => {
            let quantity = 0;
            for (let count of counts) {
                if (count.id === item.id) {
                    quantity = count.quantity;
                }
            }
            return {
                cart_id: item.id,
                quantity: quantity,
            }
        })
        console.log('newItems: ', newItems);
        saveCart.mutate(newItems);
    }

    const saveCart = useMutation(
        (items: {
            cart_id: number
            quantity: number,
        }[]): any => {
            const data = updateCart(items)
            return data;
        },
        {
            onSuccess: () => {
                present({
                    message: "Save Cart Success",
                    duration: 1000,
                    position: "top",
                    cssClass: NotificationStyle.ionicToast,
                });
            },
            onError: () => {
                present({
                    message: "Save Cart Failed",
                    duration: 1000,
                    position: "top",
                    cssClass: NotificationStyle.ionicToast,
                });
            }
        }
    )

    useIonViewWillLeave(() => {
        refetchCart();
        refetchMyCalories();
    })

    function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
        refetchMyCalories().then(() => {
            refetchCart().then(() => {
                event.detail.complete();
            })
        })
    }

    return (
        <IonPage >
            <IonHeader >
                <IonToolbar >
                    <IonButton slot="start">
                        <IonBackButton default-href="/"></IonBackButton>
                    </IonButton>
                    <IonTitle>Cart</IonTitle>
                    {isUserLoggedIn && <IonLabel slot='end' className={Fooddetailsstyle.icon}> <IonIcon icon={flameSharp} /> {myCalories}</IonLabel>}
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>

                <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>

                {cartFoods && cartFoods.length > 0 &&
                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle>FOODS</IonCardTitle>
                            {/* <IonCardSubtitle>Card Subtitle</IonCardSubtitle> */}
                        </IonCardHeader>
                        <IonCardContent>
                            <IonList>
                                {
                                    cartFoods.map((cartFood: any, index: number) => (
                                        <CartItem
                                            key={index}
                                            id={cartFood.id}
                                            name={cartFood.foods.name}
                                            quantity={cartFood.quantity}
                                            calories={cartFood.foods.calories}
                                            image={cartFood.foods.image}
                                            changeQuantity={changeQuantity}
                                            changeTotalQuantity={changeTotalQuantity}
                                            refetch={refetchCart}
                                        // image={cartFood.foods.image}
                                        />
                                    ))
                                }
                            </IonList>
                            <br />
                            <>
                                <div className={AppStyle.padding}>
                                    <IonLabel>Total Calories: {totalCalories}</IonLabel>
                                </div>
                                <div className={AppStyle.padding}>
                                    <IonSelect aria-label="PICK" placeholder="Select Pickup Location"
                                        onIonChange={(event) => setGymID(parseInt(`${event.detail.value!}`))}>
                                        {
                                            gyms && gyms.length > 0 && gyms.map((gym: any, index: number) => (
                                                <CartSelectGymItems
                                                    key={index}
                                                    gym_id={gym.id}
                                                    gym_name={gym.name}
                                                />
                                            ))
                                        }
                                    </IonSelect>
                                </div>
                                <IonGrid>
                                    <IonRow>
                                        <IonCol><IonButton expand="block" onClick={onSave}>Save Cart</IonButton></IonCol>
                                        <IonCol><IonButton expand="block" onClick={onCheckout}>Checkout</IonButton></IonCol>
                                    </IonRow>
                                </IonGrid>
                            </>
                        </IonCardContent>
                    </IonCard>
                }
                {cartFoods && cartFoods.length === 0 && <NoResult />}
            </IonContent>
        </IonPage >
    )

}
