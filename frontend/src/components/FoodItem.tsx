import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';

interface FoodItemProps {
    id: number;
    name: string;
    description: string;
}

export function FoodItem(props: FoodItemProps) {

    return (
        <IonCard>
            <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
            <IonCardHeader>
                <IonCardTitle>{props.name}</IonCardTitle>
                <IonCardSubtitle>Description</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
                {props.description}
            </IonCardContent>
        </IonCard>
    )
}