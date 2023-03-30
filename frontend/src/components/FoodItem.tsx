import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton } from '@ionic/react';
import FoodStyle from '../scss/Food.module.scss'
import React from 'react';


export interface FoodItemProps {
    id: number;
    name: any;
    description: string;
    image: string;
    calories: number;
}

function addPath(img: string) {
    return `./assets/foodimage/${img}`;
}

export function FoodItem(props: FoodItemProps) {

    return (
        <IonCard>
            <img alt="food image" src={addPath(props.image)} className={FoodStyle.food_image} />
            <IonCardHeader>
                <IonCardTitle>{props.name}</IonCardTitle>
                <IonCardSubtitle>Description</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
                {props.description}
            </IonCardContent>
            <IonCardContent>
                Calroies:{props.calories}
            </IonCardContent>

            <IonButton fill="clear">♡</IonButton>
        </IonCard>
    )
}