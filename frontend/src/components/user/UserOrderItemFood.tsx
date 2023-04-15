import { IonItem, IonThumbnail, IonLabel } from "@ionic/react";

// css
import UserMenuStyle from '../../scss/UserMenu.module.scss';

interface UserOrderFoodItemProps {
    name: string;
    quantity: number;
}

export function UserOrderItemFood(props: UserOrderFoodItemProps) {
    return (<>
        <IonItem className={UserMenuStyle.item_last}>
            <IonThumbnail slot="start">
                <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
            </IonThumbnail>
            <p className={UserMenuStyle.width_70}>{props.name}</p>
            <IonLabel className={UserMenuStyle.right}>x {props.quantity}</IonLabel>
        </IonItem>
    </>
    )


}