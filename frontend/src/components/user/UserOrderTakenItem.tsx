import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonList, IonItem, IonThumbnail, IonLabel, IonIcon, IonChip } from "@ionic/react";
import { UserOrderItemFood } from "./UserOrderItemFood";

// css
import UserMenuStyle from "../../scss/UserMenu.module.scss";
import { locationOutline, receiptSharp, storefront } from "ionicons/icons";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { useState } from "react";

interface OrderedFood {
    quantity: number,
    food: {
        name: string,
    }
}

export interface UserOrderItemProps {
    id: number;
    foods: OrderedFood[];
    shop_name: string;
    // address: string;
    food_taken_at: string;
}

export function UserOrderTakenItem(props: UserOrderItemProps) {

    const [dateTime, setDateTime] = useState<Date>(utcToZonedTime(new Date(props.food_taken_at), "Asia/Hong_Kong"))

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

                {/* <IonItem className={UserMenuStyle.item_last}>
                    <IonIcon icon={locationOutline} />
                    <IonLabel></IonLabel>
                    <p>{props.address}</p>
                </IonItem> */}

                <IonItem className={UserMenuStyle.item_last}>
                    <IonLabel>Foods Taken on:</IonLabel>
                    <p>{format(dateTime, "dd MMM yyyy")}</p>
                </IonItem>

                <IonItem className={UserMenuStyle.item_last}>
                    <IonLabel>Foods Taken at: </IonLabel>
                    <p>{format(dateTime, "hh:mm aaa")}</p>
                </IonItem>

            </IonCardContent>
        </IonCard>
    )
}