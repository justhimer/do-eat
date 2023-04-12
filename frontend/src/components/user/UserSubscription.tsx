import { IonBackButton, IonButton, IonCol, IonContent, IonGrid, IonHeader, IonItem, IonLabel, IonList, IonPage, IonRow, IonTitle, IonToolbar, useIonViewWillLeave } from "@ionic/react";
import UserMenuStyle from "../../scss/UserMenu.module.scss";
import { useQuery } from "@tanstack/react-query";
import { getSubscriptionPlans } from "../../api/subscriptionsAPI";
import { SubscriptionCard } from "./SubscriptionCard";

export function UserSubscription() {

    const isSubscribed = true;
    const subPlan = 'Basic';
    const subPlanStart = '2023-03-31 14:04:52';
    const subPlanEnd = '2023-04-30 14:04:52';
    const subscriptionPlans = useQuery({
        queryKey: ['subscriptionPlansQuery'],
        queryFn: getSubscriptionPlans
    })

    useIonViewWillLeave(() => {
        subscriptionPlans.remove()
    })

    return (
        <IonPage >
            <IonHeader >
                <IonToolbar >
                    <IonButton slot="start">
                        <IonBackButton default-href="/"></IonBackButton>
                    </IonButton>
                    <IonTitle>Subscription</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonList className={UserMenuStyle.list}>
                    <IonItem button detail={true} className={UserMenuStyle.item}>
                        <IonLabel className={UserMenuStyle.label}>
                            <h2 className={UserMenuStyle.width_50}>Subscription:</h2>
                            <p className={UserMenuStyle.width_50}>{isSubscribed ? 'Yes' : 'No'}</p>
                        </IonLabel>
                    </IonItem>
                    <IonItem button detail={true} className={UserMenuStyle.item}>
                        <IonLabel className={UserMenuStyle.label}>
                            <h2 className={UserMenuStyle.width_50}>Subscription Plan:</h2>
                            <p className={UserMenuStyle.width_50}>{subPlan}</p>
                        </IonLabel>
                    </IonItem>
                    <IonItem button detail={true} className={UserMenuStyle.item}>
                        <IonLabel className={UserMenuStyle.label}>
                            <h2 className={UserMenuStyle.width_30}>Plan Start:</h2>
                            <p className={UserMenuStyle.width_70}>{subPlanStart}</p>
                        </IonLabel>
                    </IonItem>
                    <IonItem button detail={true} className={UserMenuStyle.item_last}>
                        <IonLabel className={UserMenuStyle.label}>
                            <h2 className={UserMenuStyle.width_30}>Plan End:</h2>
                            <p className={UserMenuStyle.width_70}>{subPlanEnd}</p>
                        </IonLabel>
                    </IonItem>
                </IonList>
                <IonItem>
                        <h5>Subscription Plans:</h5>
                </IonItem>
                {subscriptionPlans.data && subscriptionPlans.data.length > 0 ? subscriptionPlans.data.map((plan, index) => <SubscriptionCard key={index} {...plan} />) : <h1>Loading...</h1>}
            </IonContent>
        </IonPage >
    )
}