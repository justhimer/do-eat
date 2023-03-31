import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton, IonGrid, IonRow, IonCol } from '@ionic/react';
// import FoodStyle from '../scss/Food.module.scss'
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
        <IonCard>
            <img alt="food image" src={addPath(props.image)} />
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

            <IonGrid>
                <IonRow>
                    <IonCol><IonButton fill="solid" expand='block'>♡</IonButton></IonCol>
                    <IonCol><IonButton fill="solid" expand='block'>Details</IonButton></IonCol>
                    <IonCol><IonButton fill="solid" expand='block'>Add to Cart</IonButton></IonCol>
                </IonRow>
            </IonGrid>

        </IonCard>
    )
}

export default FoodItem;