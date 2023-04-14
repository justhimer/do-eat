import { useQuery } from "@tanstack/react-query";
import { fetchFoodsToBeCollectedForUser } from "../../api/foodHistory";
import { IonBackButton, IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from "@ionic/react";
import { UserOrderItem } from "./UserOrderItem";

export function UserOrderList() {
    const { data: orders, isLoading, refetch, remove } = useQuery({
        queryKey: ["courses"],
        queryFn: async () => {
            const foods = await fetchFoodsToBeCollectedForUser();
            // sorting according to created_at
            foods.sort((a: any, b: any) => {
                const timeA = Date.parse(a.created_at);
                const timeB = Date.parse(b.created_at);
                return timeA - timeB;
            });
            return foods;
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
                            foods={order.FoodOrder}
                            address={order.gym.address}
                            no_close={order.gym.no_close}
                            opening={order.gym.no_close? order.gym.opening_hour : undefined}
                            closing={order.gym.no_close? order.gym.closing_hour : undefined}
                            google_position={order.gym.google_position}
                        />
                    ))
                }
            </IonContent>
        </IonPage >
    )
}