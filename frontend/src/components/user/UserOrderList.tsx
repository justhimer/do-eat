import { useQuery } from "@tanstack/react-query";
import { fetchFoodsToBeCollectedForUser } from "../../api/foodHistory";
import { IonBackButton, IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from "@ionic/react";
import { UserOrderItem } from "./UserOrderItem";

export function UserOrderList() {
    const { data: orders, isLoading, refetch, remove } = useQuery({
        queryKey: ["user_orders"],
        queryFn: async () => {
            const orders = await fetchFoodsToBeCollectedForUser();
            // sorting according to created_at
            orders.sort((a: any, b: any) => {
                const timeA = Date.parse(a.created_at);
                const timeB = Date.parse(b.created_at);
                return timeA - timeB;
            });
            //console.log(orders);
            return orders;
        },
    });

    useIonViewWillEnter(() => {
        refetch();
    }, [])

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
                {
                    orders && orders.length > 0 && orders.map((order: any) => (
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
            </IonContent>
        </IonPage >
    )
}