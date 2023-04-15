
// css
import { IonCard, IonCardHeader, IonCardSubtitle, IonIcon, IonCardContent, IonList, IonItem, IonLabel } from "@ionic/react";
import { format, utcToZonedTime } from "date-fns-tz";
import { receiptSharp } from "ionicons/icons";
import { useState } from "react";
import UserMenuStyle from "../../scss/UserMenu.module.scss";
import { GymOrderItemFood } from "./GymOrderItemFood";

interface OrderedFood {
    quantity: number,
    food: {
        name: string,
    }
}

export interface GymOrderItemProps {
    id: number;
    foods: OrderedFood[],
    orderReceivedAt: string
}


export function GymOrderItem(props: GymOrderItemProps) {

    const [orderReceivedAt, setOrderReceivedAt] = useState<Date>(utcToZonedTime(new Date(props.orderReceivedAt), "Asia/Hong_Kong"));

    return (
        <IonCard>
            <IonCardHeader>
                <IonCardSubtitle>
                    <IonIcon icon={receiptSharp} />
                    <span></span> ticket #{props.id}
                </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
                <IonList>
                    {
                        props.foods && props.foods.length > 0 && props.foods.map((food: OrderedFood, index: number) => (
                            <GymOrderItemFood
                                key={index}
                                name={food.food.name}
                                quantity={food.quantity}
                            />
                        ))
                    }
                </IonList>

                <br />

                <IonItem className={UserMenuStyle.item_last}>
                    <IonLabel>Order Time:</IonLabel>
                    <IonLabel>{format(orderReceivedAt, "hh:mm aaa, dd MMM")}</IonLabel>
                </IonItem>

            </IonCardContent>
        </IonCard>
    )
}