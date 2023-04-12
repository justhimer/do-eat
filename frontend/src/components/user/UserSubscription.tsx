import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonItem, IonLabel, IonList, IonModal, IonPage, IonRow, IonTitle, IonToolbar, useIonViewWillEnter, useIonViewWillLeave } from "@ionic/react";
import UserMenuStyle from "../../scss/UserMenu.module.scss";
import { useQuery } from "@tanstack/react-query";
import { SubscriptionPlan, getSubscriptionPlans } from "../../api/subscriptionsAPI";
import { SubscriptionCard } from "./SubscriptionCard";
import { useState } from "react";
import { getPaymentURL } from "../../api/paymentAPI";

export function UserSubscription() {

    const isSubscribed = true;
    const subPlan = 'Basic';
    const subPlanStart = '2023-03-31 14:04:52';
    const subPlanEnd = '2023-04-30 14:04:52';

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [modalData, setModalData] = useState<null|SubscriptionPlan>(null)
    const subscriptionPlans = useQuery({
        queryKey: ['subscriptionPlansQuery'],
        queryFn: getSubscriptionPlans
    })

    function clickToModal (plan:SubscriptionPlan){
        setModalData(plan)
        setModalOpen(true)
    }

    function paymentProceed(plan_id:number){
        getPaymentURL(plan_id)
    }

    useIonViewWillEnter(()=>{
        subscriptionPlans.refetch()
    })

    useIonViewWillLeave(() => {
        setModalOpen(false)
        setModalData(null)
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
                <IonModal isOpen={modalOpen}>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Confirm Payment</IonTitle>
                            <IonButtons slot="end">
                                <IonButton onClick={() => setModalOpen(false)}>Close</IonButton>
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent className="ion-padding">
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni illum quidem recusandae ducimus quos
                            reprehenderit. Veniam, molestias quos, dolorum consequuntur nisi deserunt omnis id illo sit cum qui.
                            Eaque, dicta.
                        </p>
                        <IonButton onClick={()=>paymentProceed(modalData!.id)}>Proceed To Payment</IonButton>
                    </IonContent>
                </IonModal>
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
                {subscriptionPlans.data && subscriptionPlans.data.length > 0 ? subscriptionPlans.data.map((plan, index) => <SubscriptionCard key={index} {...plan} clickToModal={()=>clickToModal(plan)} />) : <h1>Loading...</h1>}
            </IonContent>
        </IonPage >
    )
}