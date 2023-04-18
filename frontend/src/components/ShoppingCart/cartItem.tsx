import { IonItem, IonThumbnail, IonLabel, IonButton, IonChip, IonItemSliding, IonItemOptions, IonItemOption } from "@ionic/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { deleteCart } from "../../api/cartAPI";

// css
import UserMenuStyle from '../../scss/UserMenu.module.scss';

export interface CartItemProps {
    id: number;
    name: string;
    quantity: number;
    calories: number;
    image: string;
    changeQuantity: (id: number, newQuantity: number) => void;
    changeTotalQuantity: ()=> void;
    refetch: () => void
    // image: string;
}

export function CartItem(props: CartItemProps) {

    const [newQuantity, setNewQuantity] = useState(props.quantity);

    const deletingFood = useMutation(() => deleteCart(props.id), {
        onSuccess: (data) => {
            console.log('success')
            props.refetch()

        },
        onError: (error) => {
            console.log('fail')
        }
    })


    function onClickPlus() {
        props.changeQuantity(props.id, newQuantity + 1);
        props.changeTotalQuantity();
        setNewQuantity(newQuantity + 1);
    }

    function onClickMinus() {
        if (newQuantity <= 1) { return }
        props.changeQuantity(props.id, newQuantity - 1);
        props.changeTotalQuantity();
        setNewQuantity(newQuantity - 1);
    }



    return (
        <>
        <IonItemSliding>
            <IonItem className={UserMenuStyle.item_last}>
                <IonThumbnail slot="start">
                    <img alt="food icon" src={`./assets/icon/food_icon.png`} className={UserMenuStyle.food_order_img} />
                </IonThumbnail>
                <p className={UserMenuStyle.width_70}>
                    {props.name}
                    <br />
                    <IonChip outline={true} color="danger"><IonLabel>Calories: {props.calories * newQuantity}</IonLabel></IonChip>
                </p>
                <IonButton onClick={onClickMinus}>-</IonButton>
                <p>{newQuantity}</p>
                <IonButton onClick={onClickPlus}>+</IonButton>
            </IonItem>

            <IonItemOptions>
                <IonItemOption color="danger" onClick={() => deletingFood.mutate()}>Delete</IonItemOption>
            </IonItemOptions>

        </IonItemSliding>
        </>
        
    )


}