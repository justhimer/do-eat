// css
import UserMenuStyle from "../../scss/UserMenu.module.scss";
import courseStyle from '../../scss/GymCourses.module.scss'

// library
import { IonCard, IonCardHeader, IonCardTitle, IonChip, IonCardSubtitle, IonIcon, IonCardContent, IonList, IonItem, IonLabel, IonButton } from "@ionic/react";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { barbellOutline, calendarSharp, qrCode } from "ionicons/icons";
import { useState } from "react";

export interface GymScheduleItemProps {
    classID: number
    courseName: string;
    time: string;
    duration: number;
    trainerName: string;
    quota: number
    filledSlot: number;
    courseType: string;
    // intensityID: number;
    // intensityLevel: string;
}

export function GymScheduleItem(props: GymScheduleItemProps) {

    const [date, setDate] = useState<Date>(utcToZonedTime(new Date(props.time), "Asia/Hong_Kong"));

    return (
        <>

            <IonCard>
                <IonCardHeader>
                    <div className={courseStyle.cardTopRightChips}>
                        <IonChip >
                            <IonLabel>{props.courseType}</IonLabel>
                        </IonChip>
                    </div>
                    <IonCardTitle>{props.courseName}</IonCardTitle>
                    <IonCardSubtitle>Class #{props.classID}</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                    <IonList>
                        <IonItem className={UserMenuStyle.item}>
                            <IonLabel>Date:</IonLabel>
                            <IonLabel>{format(date, "dd MMM yyyy, E")}</IonLabel>
                        </IonItem>
                        <IonItem className={UserMenuStyle.item}>
                            <IonLabel>Start at:</IonLabel>
                            <IonLabel>{format(date, "hh:mm aaa")}</IonLabel>
                        </IonItem>
                        <IonItem className={UserMenuStyle.item}>
                            <IonLabel>Duration:</IonLabel>
                            <IonLabel>{props.duration} mins</IonLabel>
                        </IonItem>
                        <IonItem className={UserMenuStyle.item}>
                            <IonLabel>Trainer:</IonLabel>
                            <IonLabel>{props.trainerName}</IonLabel>
                        </IonItem>
                        <IonItem className={UserMenuStyle.item_last}>
                            <IonLabel>Attendee:</IonLabel>
                            <IonLabel>{props.filledSlot} / {props.quota}</IonLabel>
                        </IonItem>
                    </IonList>
                    <br />
                    <IonButton expand="block">Show Attendence</IonButton>
                </IonCardContent>

            </IonCard>
        </>
    )
}