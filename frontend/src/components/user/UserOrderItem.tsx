import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonList, IonItem, IonThumbnail, IonLabel } from "@ionic/react";

export interface UserOrderItemProps {
    foods: {
        quantity: number,
        food: {
            name: string,
        }
    }[],
    address: string;
    no_close: boolean;
    opening: string | undefined;
    closing: string | undefined;
    google_position: {
        lat: number,
        lng: number
    }
}

export function UserOrderItem(props: UserOrderItemProps) {
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