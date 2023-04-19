import { IonItem, IonLabel } from "@ionic/react";
import UserMenuStyle from "../../scss/UserMenu.module.scss";


export interface GymShowAttendanceItemProps {
    user_name: string;
    attendance_status: string;
}

export function GymShowAttendanceItem(props: GymShowAttendanceItemProps) {

    return (
        <IonItem className={UserMenuStyle.item_last}>
            <IonLabel className={UserMenuStyle.label}>
                <h2 className={UserMenuStyle.width_70}>{props.user_name}</h2>
                <p className={UserMenuStyle.width_30}>{props.attendance_status}</p>
            </IonLabel>
        </IonItem>
    )
}