import { useIonViewWillEnter, IonPage, IonHeader, IonToolbar, IonButton, IonBackButton, IonTitle, IonContent } from "@ionic/react";
import { useQuery } from "@tanstack/react-query";
import { fetchFoodsOrdersForGym } from "../../api/foodHistoryAPIs";
import { GymOrderItem } from "./GymOrderItem";


export function GymOrderList() {
    const { data: orders, isLoading, refetch, remove } = useQuery({
        queryKey: ["gym_orders"],
        queryFn: async () => {
            const orders = await fetchFoodsOrdersForGym();
            // sorting according to created_at
            orders.sort((a: any, b: any) => {
                const timeA = Date.parse(a.created_at);
                const timeB = Date.parse(b.created_at);
                return timeA - timeB;
            });
            console.log(orders);
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
                    <IonTitle>Food Orders</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                {
                    orders && orders.length > 0 && orders.map((order: any) => (
                        <GymOrderItem
                            key={order.id}
                            id={order.id}
                            foods={order.FoodOrder}
                            orderReceivedAt={order.created_at}
                        />
                    ))
                }
            </IonContent>
        </IonPage >
    )
}