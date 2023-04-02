import { IonThumbnail,IonItem,IonLabel,IonCardSubtitle } from '@ionic/react';

interface GymCardInterface {
    district: string;
    name: string;
    icon: string;
    details: string;
    id: number;
}

export function SoloGym(props: GymCardInterface) {

    return (
        <IonItem>
            <IonThumbnail slot="start">
              <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
            </IonThumbnail>
            <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
            <IonLabel>Item</IonLabel>
          </IonItem>
    )
}