// Fooddetails.tsx
import React from 'react';
import { FoodItemProps } from './FoodItem';
import { IonButton } from '@ionic/react';

export const Fooddetails = (props: FoodItemProps) => {
    return (
        <div>
            <h1>Food Details</h1>
            <div>
                <img src={`./assets/foodimage/${props.image}`} alt='food image' />
            </div>
            <div>
                <h2>{props.name}</h2>
                <p>{props.description}</p>
                <p>Calories: {props.calories}</p>
                <IonButton fill="solid">Add to Cart </IonButton>
            </div>
        </div>

    )
};

export default Fooddetails;
