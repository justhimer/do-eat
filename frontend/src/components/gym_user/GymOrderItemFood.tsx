
// css
import { IonItem, IonThumbnail, IonLabel } from '@ionic/react';
import UserMenuStyle from '../../scss/UserMenu.module.scss';

interface GymOrderFoodItemProps {
    name: string;
    quantity: number;
}

export function GymOrderItemFood(props: GymOrderFoodItemProps) {
    return (<>
        <IonItem className={UserMenuStyle.item_last}>
            <IonThumbnail slot="start">
                <img src="./assets/icon/food_icon.png" className={UserMenuStyle.food_order_img}/>
            </IonThumbnail>
            <p className={UserMenuStyle.width_70}>{props.name}</p>
            <IonLabel className={UserMenuStyle.right}>x {props.quantity}</IonLabel>
        </IonItem>
    </>
    )


}