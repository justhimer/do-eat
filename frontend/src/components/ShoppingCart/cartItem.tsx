import { IonItem, IonThumbnail, IonLabel, IonButton } from "@ionic/react";
import { useState } from "react";

// css
import UserMenuStyle from '../../scss/UserMenu.module.scss';

export interface CartItemProps {
    id: number;
    name: string;
    quantity: number;
    calories: number;
    changeQuantity: (id: number, newQuantity: number) => void;
    // image: string;
}

export function CartItem(props: CartItemProps) {

    const [newQuantity, setNewQuantity] = useState(props.quantity);

    function onClickPlus() {
        props.changeQuantity(props.id, newQuantity + 1);
        setNewQuantity(newQuantity + 1);
    }

    function onClickMinus() {
        if (newQuantity <= 1) { return }
        props.changeQuantity(props.id, newQuantity - 1);
        setNewQuantity(newQuantity - 1);
    }

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
            <IonButton onClick={onClickMinus}>-</IonButton>
            <p>{newQuantity}</p>
            <IonButton onClick={onClickPlus}>+</IonButton>
        </IonItem>
    </>
    )


}