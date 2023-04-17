import { IonItem, IonThumbnail, IonLabel, IonButton } from "@ionic/react";
import { useState } from "react";

// css
import UserMenuStyle from '../../scss/UserMenu.module.scss';

export interface CartItemProps {
    name: string;
    quantity: number;
    calories: number;
    // image: string;
}

export function CartItem(props: CartItemProps) {

    // const [count, setCount] = useState(props.quantity);
    const [count, setCount] = useState(0);

    return (<>
        <IonItem className={UserMenuStyle.item_last}>
            <IonThumbnail slot="start">
                <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
            </IonThumbnail>
            <p className={UserMenuStyle.width_70}>
                {props.name}
                <br />
                Calories: {props.calories}
            </p>
            <IonButton onClick={() => setCount(count - 1)}>-</IonButton>
            <p>{count}</p>
            <IonButton onClick={() => setCount(count + 1)}>+</IonButton>
        </IonItem>
    </>
    )


}