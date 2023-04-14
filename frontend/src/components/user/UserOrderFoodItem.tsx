import { IonItem, IonThumbnail, IonLabel } from "@ionic/react";

// css
import UserMenuStyle from '../../scss/UserMenu.module.scss';

export interface UserOrderFoodItemProps {
    name: string;
    quantity: number;
}

export function UserOrderFoodItem(props: UserOrderFoodItemProps) {
    return (<>
        <IonItem className={UserMenuStyle.item_last}>
            <IonThumbnail slot="start">
                <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
            </IonThumbnail>
            <p className={UserMenuStyle.width_70}>{props.name}</p>
            <IonLabel className={UserMenuStyle.right}>x {props.quantity}</IonLabel>
        </IonItem>

        {/* <IonItem lines="none">
            <IonThumbnail slot="start">
                <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
            </IonThumbnail>
            <IonLabel>Item</IonLabel>
        </IonItem> */}
    </>
    )


}