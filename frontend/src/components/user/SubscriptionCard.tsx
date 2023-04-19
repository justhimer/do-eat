import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonLabel, IonList } from "@ionic/react";
import { SubscriptionPlan } from "../../api/subscriptionsAPI";

export interface SubscriptionChildCard extends SubscriptionPlan {
    clickToModal: (plan: SubscriptionPlan) => void

}


export function SubscriptionCard(props: SubscriptionChildCard) {

    return (
        <>
            <IonCard>
                <IonCardHeader>
                    <IonCardTitle>{props.name} plan</IonCardTitle>
                    <IonCardSubtitle>HKD {props.fee}</IonCardSubtitle>
                </IonCardHeader>

                <IonCardContent>
                    <IonList>

                        {props.unlimited ?
                            <>
                                <IonItem>
                                    <IonLabel>Duration:</IonLabel>
                                    <IonLabel>{props.duration} days</IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonLabel>Unlimited Classes</IonLabel>
                                </IonItem>
                            </>
                            :
                            <>
                            <IonItem >
                                <IonLabel>Add Credits:</IonLabel>
                                <IonLabel>{props.credits} credits</IonLabel>
                            </IonItem>
                            <IonItem >
                                <IonLabel>Duration:</IonLabel>
                                <IonLabel>{props.duration} days</IonLabel>
                            </IonItem>
                            </>
                            
                        }

                    </IonList>
                    <br />
                    <IonButton onClick={()=>props.clickToModal({id:props.id,name:props.name,unlimited:props.unlimited,credits:props.credits,fee:props.fee,duration:props.duration})} expand="block">Subscribe</IonButton>
                </IonCardContent>

            </IonCard>
        </>
    )
}