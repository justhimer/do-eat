import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton, IonGrid, IonRow, IonCol, IonList, IonItem } from '@ionic/react';
import FoodStyle from '../scss/Food.module.scss'
import { useHistory } from 'react-router-dom';
export interface FoodItemProps {
    id: number;
    name: string;
    description: string;
    image: string;
    calories: number;
    allergens: string;
}

function addPath(img: string) {
    return `./assets/foodimage/${img}`;
}

export function FoodItem(props: FoodItemProps) {

    const history = useHistory();
    const toFoodDetails = (id: number) => {
        history.push(`/fooddetails/${id}`)
    }
    return (
        <IonCard>
            <IonList>
                <IonItem onClick={() => toFoodDetails(props.id)}>
                    <img alt="food image" src={addPath(props.image)} className={FoodStyle.image} />
                    <IonCardHeader>
                        <IonCardTitle className={FoodStyle.name || FoodStyle.calories}>{props.name} Calories:{props.calories}</IonCardTitle>
                    </IonCardHeader>

                </IonItem>
            </IonList>
        </IonCard >
    )
}

export default FoodItem;