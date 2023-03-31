import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton } from '@ionic/react';
import FoodStyle from '../scss/Food.module.scss'
import React from 'react';
import { Link } from 'react-router-dom';

export interface FoodItemProps {
    id: number;
    name: string;
    description: string;
    image: string;
    calories: number;
}

function addPath(img: string) {
    return `./assets/foodimage/${img}`;
}

export function FoodItem(props: FoodItemProps) {

    return (
        <IonCard color="light">
            <img alt="food image" src={addPath(props.image)} className={FoodStyle.food_image} />
            <IonCardHeader>
                <IonCardTitle>{props.name}</IonCardTitle>
                <IonCardSubtitle>Description</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
                {props.description}
            </IonCardContent>
            <IonCardContent>
                Calories:{props.calories}
            </IonCardContent>
            <IonButton fill="solid">♡</IonButton>
            <IonButton fill="solid" routerLink='/Fooddetails'>Details</IonButton>
        </IonCard>
    )
}

export default FoodItem;