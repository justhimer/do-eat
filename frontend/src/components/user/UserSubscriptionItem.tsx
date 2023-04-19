import { IonItem, IonLabel } from "@ionic/react";
import UserMenuStyle from "../../scss/UserMenu.module.scss";

import { utcToZonedTime } from "date-fns-tz";
import format from "date-fns/format";
import { useState } from "react";

export interface UserSubscriptionItemProps {
    plan_name: string;
    plan_start: string;
    plan_end: string;
}

export function UserSubscriptionItem(props: UserSubscriptionItemProps) {

    console.log(props.plan_start)
    console.log(props.plan_end)
    const [subPlanStartDate, setSubPlanStartDate] = useState<Date>(utcToZonedTime(new Date(props.plan_start), "Asia/Hong_Kong"));
    const [subPlanEndDate, setSubPlanEndDate] = useState<Date>(utcToZonedTime(new Date(props.plan_end), "Asia/Hong_Kong"))
    console.log(subPlanStartDate)
    console.log(subPlanEndDate)
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
                    <p className={UserMenuStyle.width_70}>{format(subPlanStartDate, "dd MMM yyyy, hh:mm aaa")}</p>
                </IonLabel>
            </IonItem>
            <IonItem button detail={true} className={UserMenuStyle.item_last}>
                <IonLabel className={UserMenuStyle.label}>
                    <h2 className={UserMenuStyle.width_30}>Plan End:</h2>
                    <p className={UserMenuStyle.width_70}>{format(subPlanEndDate, "dd MMM yyyy, hh:mm aaa")}</p>
                </IonLabel>
            </IonItem>
        </>
    )
}