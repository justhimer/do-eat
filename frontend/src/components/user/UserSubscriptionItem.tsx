import { IonItem, IonLabel } from "@ionic/react";
import UserMenuStyle from "../../scss/UserMenu.module.scss";

import { utcToZonedTime } from "date-fns-tz";
import format from "date-fns/format";
import { useState } from "react";

export interface UserSubscriptionItemProps {
    plan_name: string;
    plan_updated_at: string;
    plan_duration: number
}

export function UserSubscriptionItem(props: UserSubscriptionItemProps) {

    const [subPlanUpdateDate, setSubPlanUpdateDate] = useState<Date>(utcToZonedTime(new Date(props.plan_updated_at), "Asia/Hong_Kong"));
    
    return (
        <>
            <IonItem button detail={true} className={UserMenuStyle.item}>
                <IonLabel className={UserMenuStyle.label}>
                    <h2 className={UserMenuStyle.width_50}>Subscription Plan:</h2>
                    <p className={UserMenuStyle.width_50}>{props.plan_name}</p>
                </IonLabel>
            </IonItem>
            <IonItem button detail={true} className={UserMenuStyle.item}>
                <IonLabel className={UserMenuStyle.label}>
                    <h2 className={UserMenuStyle.width_30}>Plan Start:</h2>
                    <p className={UserMenuStyle.width_70}>{format(subPlanUpdateDate, "dd MMM yyyy, hh:mm aaa")}</p>
                </IonLabel>
            </IonItem>
            <IonItem button detail={true} className={UserMenuStyle.item_last}>
                <IonLabel className={UserMenuStyle.label}>
                    <h2 className={UserMenuStyle.width_50}>Plan Duration:</h2>
                    <p className={UserMenuStyle.width_50}>{props.plan_duration} days</p>
                </IonLabel>
            </IonItem>
        </>
    )
}