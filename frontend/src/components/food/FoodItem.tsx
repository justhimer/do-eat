import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton, IonGrid, IonRow, IonCol, IonList, IonItem, IonChip, IonLabel, IonIcon } from '@ionic/react';
import FoodStyle from '../../scss/Food.module.scss'
import courseStyle from '../../scss/GymCourses.module.scss'
import UserMenuStyle from '../../scss/UserMenu.module.scss';
import { useHistory } from 'react-router-dom';
import { flameOutline, flameSharp } from 'ionicons/icons';
export interface FoodItemProps {
    id: number;
    name: string;
    description: string;
    image: string;
    calories: number;
    allergens: string;
    type: string;
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
                <div className={courseStyle.cardTopRightChips}>
                    <IonChip >
                        <IonIcon icon={flameSharp} />
                        <IonLabel>{props.calories}</IonLabel>
                    </IonChip>
                </div>
                <IonItem onClick={() => toFoodDetails(props.id)} className={UserMenuStyle.item_last}>
                    <img alt="food image" src={addPath(props.image)} className={FoodStyle.image} />
                    <IonCardHeader>
                        <IonCardSubtitle>{props.type}</IonCardSubtitle>
                        <IonCardSubtitle></IonCardSubtitle>
                        <IonCardSubtitle></IonCardSubtitle>
                        <IonCardTitle className={FoodStyle.name}>{props.name}</IonCardTitle>
                    </IonCardHeader>
                </IonItem>
            </IonList>
        </IonCard >
    )
}

export default FoodItem;