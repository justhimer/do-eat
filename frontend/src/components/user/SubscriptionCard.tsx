import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonLabel, IonList } from "@ionic/react";
import { SubscriptionPlan } from "../../api/subscriptionsAPI";

export interface SubscriptionChildCard extends SubscriptionPlan{
    clickToModal : ()=>void
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
                        <IonItem>
                            <IonLabel>Duration</IonLabel>
                            <IonLabel>{props.duration} days</IonLabel>
                        </IonItem>
                        {props.unlimited? 
                        <IonItem>
                            <IonLabel>Unlimited Classes</IonLabel>
                        </IonItem>
                        :
                        <IonItem>
                            <IonLabel>Added Credits</IonLabel>
                            <IonLabel>{props.credits} credits</IonLabel>
                        </IonItem>
                        }

                    </IonList>
                    <IonButton onClick={props.clickToModal}>Action 1</IonButton>
                </IonCardContent>

                
            </IonCard>
        </>
    )
}