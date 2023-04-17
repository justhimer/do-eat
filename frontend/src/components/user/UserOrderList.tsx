import UserStyle from '../../scss/User.module.scss';

import { useQuery } from "@tanstack/react-query";
import { fetchFoodsCollectedByUser, fetchFoodsToBeCollectedForUser } from "../../api/foodHistoryAPIs";
import { IonBackButton, IonButton, IonContent, IonHeader, IonLabel, IonPage, IonRefresher, IonRefresherContent, IonSegment, IonSegmentButton, IonTitle, IonToolbar, RefresherEventDetail, useIonViewWillEnter } from "@ionic/react";
import { UserOrderItem } from "./UserOrderItem";
import { useState } from 'react';
import { UserOrderTakenItem } from './UserOrderTakenItem';
import { NoResult } from '../NoResult';

export function UserOrderList() {

    const defaultCheckWhat = "take";
    const [checkWhat, setCheckWhat] = useState<string>(defaultCheckWhat);

    const { data: orders, isLoading: ordersLoading, refetch: ordersRefetch, remove: ordersRemove } = useQuery({
        queryKey: ["user_orders"],
        queryFn: async () => {
            const orders = await fetchFoodsToBeCollectedForUser();
            // sorting according to created_at
            orders.sort((a: any, b: any) => {
                const timeA = Date.parse(a.updated_at);
                const timeB = Date.parse(b.updated_at);
                return timeA - timeB;
            });
            // console.log(orders);
            return orders;
        },
    });

    const { data: takenOrders, isLoading: takenOrdersLoading, refetch: takenOrdersRefetch, remove: takenOrdersRemove } = useQuery({
        queryKey: ["user_orders_taken"],
        queryFn: async () => {
            const taken_orders = await fetchFoodsCollectedByUser();
            // sorting according to created_at
            taken_orders.sort((a: any, b: any) => {
                const timeA = Date.parse(a.updated_at);
                const timeB = Date.parse(b.updated_at);
                return timeA - timeB;
            });
            // console.log(orders);
            return taken_orders;
        },
    });

    function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
        if (checkWhat === "take") {
            ordersRefetch().then(() => {
                event.detail.complete();
            })
        } else {
            takenOrdersRefetch().then(() => {
                event.detail.complete();
            })
        }
    }

    // useIonViewWillEnter(() => {
    //     refetch();
    // }, [])

    return (
        <IonPage >
            <IonHeader >
                <IonToolbar >
                    <IonButton slot="start">
                        <IonBackButton default-href="/"></IonBackButton>
                    </IonButton>
                    <IonTitle>Ordered Foods</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>

                <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>

                <IonSegment
                    value={checkWhat}
                    className={UserStyle.segment}
                    onIonChange={(e) => { setCheckWhat(e.detail.value!); }}
                >
                    <IonSegmentButton value="take">
                        <IonLabel>Take</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="taken">
                        <IonLabel>Taken</IonLabel>
                    </IonSegmentButton>
                </IonSegment>

                {
                    checkWhat === 'take' && orders && orders.length > 0 && orders.map((order: any) => (
                        <UserOrderItem
                            key={order.id}
                            id={order.id}
                            shop_name={order.gym.name}
                            foods={order.FoodOrder}
                            address={order.gym.address}
                            no_close={order.gym.no_close}
                            opening={order.gym.no_close ? undefined : order.gym.opening_hour}
                            closing={order.gym.no_close ? undefined : order.gym.closing_hour}
                            google_position={order.gym.google_position}
                        />
                    ))
                }

                {
                    checkWhat === 'taken' && takenOrders && takenOrders.length > 0 && takenOrders.map((order: any) => (
                        <UserOrderTakenItem
                            key={order.id}
                            id={order.id}
                            shop_name={order.gym.name}
                            foods={order.FoodOrder}
                            // address={order.gym.address}
                            food_taken_at={order.updated_at}
                        />
                    ))
                }

                {checkWhat === 'take' && (orders && orders.length === 0) && <NoResult />}
                {checkWhat === 'taken' && (takenOrders && takenOrders.length === 0) && <NoResult />}

            </IonContent>
        </IonPage >
    )
}