import { IonItem, IonThumbnail, IonLabel, IonIcon, IonChip, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonList } from "@ionic/react";
import { calendarSharp } from "ionicons/icons";
import { utcToZonedTime } from 'date-fns-tz';
import format from "date-fns/format";
import { useState } from "react";

// css
import UserMenuStyle from "../../scss/UserMenu.module.scss";
import AppStyle from "../../scss/App.module.scss";

export interface UserScheduleItemProps {
    courseName: string;
    time: string;
    duration: number;
    gymName: string;
    address: string;
    attendence: string;
}

export function UserScheduleItem(props: UserScheduleItemProps) {

    const [date, setDate] = useState<Date>(utcToZonedTime(new Date(props.time), "Asia/Hong_Kong"))

    return (
        <>

            <IonCard>
                <IonCardHeader>
                    <IonCardTitle>{props.courseName}</IonCardTitle>
                    <IonCardSubtitle>
                        <IonIcon icon={calendarSharp} />
                        {props.time.split('T')[0]}
                        ({format(date, "E")})
                    </IonCardSubtitle>
                </IonCardHeader>

                <IonCardContent>
                    <IonList>
                        <IonItem className={UserMenuStyle.item}>
                            <IonLabel>Start at:</IonLabel>
                            <IonLabel>{format(date, "hh:mm aaa")}</IonLabel>
                        </IonItem>
                        <IonItem className={UserMenuStyle.item}>
                            <IonLabel>Duration:</IonLabel>
                            <IonLabel>{props.duration} mins</IonLabel>
                        </IonItem>
                        <IonItem className={UserMenuStyle.item}>
                            <IonLabel>Attendence:</IonLabel>
                            <IonLabel>{props.attendence}</IonLabel>
                        </IonItem>
                        <IonItem className={UserMenuStyle.item_last}>
                            <IonLabel className={AppStyle.bold}>{props.gymName}</IonLabel>
                        </IonItem>
                        <IonItem className={UserMenuStyle.item_last}>
                            <p>{props.address}</p>
                        </IonItem>
                    </IonList>
                    <br />
                    <IonButton expand="block">Cancel</IonButton>
                </IonCardContent>

            </IonCard>
        </>
    )
}