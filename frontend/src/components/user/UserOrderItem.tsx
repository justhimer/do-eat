import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonList, IonItem, IonThumbnail, IonLabel } from "@ionic/react";
import { UserOrderFoodItem } from "./UserOrderFoodItem";

// css
import UserMenuStyle from "../../scss/UserMenu.module.scss";

interface OrderedFood {
    quantity: number,
    food: {
        name: string,
    }
}

export interface UserOrderItemProps {
    foods: OrderedFood[],
    address: string;
    no_close: boolean;
    opening: string | undefined;
    closing: string | undefined;
    google_position: {
        lat: number,
        lng: number
    }
}

export function UserOrderItem(props: UserOrderItemProps) {
    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>Card Title</IonCardTitle>
                <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
                <IonList>

                    {
                        props.foods && props.foods.length > 0 && props.foods.map((food: OrderedFood, index: number) => (
                            <UserOrderFoodItem
                                key={index}
                                name={food.food.name}
                                quantity={food.quantity}
                            />
                        ))
                    }

                </IonList>

                {/* <IonItem className={UserMenuStyle.item_last}>
                    <IonLabel>{props.no_close ? "no-close" : "will-close"}</IonLabel>
                    <IonLabel>{props.opening}</IonLabel>
                    <IonLabel>{props.closing}</IonLabel>
                </IonItem>

                <IonItem className={UserMenuStyle.item_last}>
                    <p>{props.address}</p>
                </IonItem> */}

            </IonCardContent>
        </IonCard>
    )
}