import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonList, IonItem, IonThumbnail, IonLabel, IonIcon, IonChip } from "@ionic/react";
import { UserOrderItemFood } from "./UserOrderItemFood";

// css
import UserMenuStyle from "../../scss/UserMenu.module.scss";
import { locationOutline, receiptSharp, storefront } from "ionicons/icons";

interface OrderedFood {
    quantity: number,
    food: {
        name: string,
    }
}

export interface UserOrderItemProps {
    id: number;
    foods: OrderedFood[],
    shop_name: string,
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
                {/* <IonCardTitle>Card Title</IonCardTitle> */}
                <IonCardSubtitle>
                    <IonIcon icon={storefront} />
                    <span></span> {props.shop_name}
                </IonCardSubtitle>
                <IonCardSubtitle>
                    <IonIcon icon={receiptSharp} />
                    <span></span> ticket #{props.id}
                </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
                <IonList>
                    {
                        props.foods && props.foods.length > 0 && props.foods.map((food: OrderedFood, index: number) => (
                            <UserOrderItemFood
                                key={index}
                                name={food.food.name}
                                quantity={food.quantity}
                            />
                        ))
                    }
                </IonList>

                <br />

                <IonItem className={UserMenuStyle.item_last}>
                    <IonIcon icon={locationOutline} />
                    <IonLabel></IonLabel>
                    <p>{props.address}</p>
                </IonItem>

                <IonItem className={UserMenuStyle.item_last}>
                    {
                        !props.no_close ? (
                            <>
                                <IonChip outline={true} color="danger">Open at: {props.opening}</IonChip>
                                <IonChip outline={true} color="danger">Close at: {props.closing}</IonChip>
                            </>
                        ) : <IonChip outline={true} color="danger">24 hrs Open</IonChip>
                    }
                </IonItem>

            </IonCardContent>
        </IonCard>
    )
}