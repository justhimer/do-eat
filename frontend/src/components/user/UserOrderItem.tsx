import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonList, IonItem, IonThumbnail, IonLabel } from "@ionic/react";

export interface UserOrderItemProps {
    created_at: string;
    foods: {
        name: string,
        quantity: number
    }[],
    address: string;
    no_close: boolean;
    

}

export function UserOrderItem() {
    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>Card Title</IonCardTitle>
                <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
                <IonList>
                    <IonItem>
                        <IonThumbnail slot="start">
                            <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
                        </IonThumbnail>
                        <IonLabel>Item</IonLabel>
                    </IonItem>

                    <IonItem>
                        <IonThumbnail slot="start">
                            <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
                        </IonThumbnail>
                        <IonLabel>Item</IonLabel>
                    </IonItem>

                    <IonItem>
                        <IonThumbnail slot="start">
                            <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
                        </IonThumbnail>
                        <IonLabel>Item</IonLabel>
                    </IonItem>

                    <IonItem lines="none">
                        <IonThumbnail slot="start">
                            <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
                        </IonThumbnail>
                        <IonLabel>Item</IonLabel>
                    </IonItem>
                </IonList>
            </IonCardContent>
        </IonCard>
    )
}