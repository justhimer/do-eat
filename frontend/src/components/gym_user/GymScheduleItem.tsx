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
    id: number
    courseName: string;
    time: string;
    duration: number;
    trainerName: string;
    quota: number
    filledSlot: number;
    courseTypeName: string;
    // intensityID: number;
    // intensityLevel: string;
}

export function GymScheduleItem(props: GymScheduleItemProps) {

    const [date, setDate] = useState<Date>(utcToZonedTime(new Date(props.time), "Asia/Hong_Kong"));

    return (
        <>

            <IonCard>
                <div className={courseStyle.cardTopChips}>
                    <IonChip >
                        <IonLabel>{props.courseTypeName}</IonLabel>
                    </IonChip>
                </div>
                <IonCardHeader>
                    <IonCardTitle>
                        {props.courseName}
                    </IonCardTitle>
                    {/* <IonCardSubtitle>
                        <IonIcon icon={calendarSharp} />
                        <span></span> {format(date, "dd MMM yyyy, E")}
                    </IonCardSubtitle> */}
                    <IonCardSubtitle>Class #{props.id}</IonCardSubtitle>
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
                    <IonButton expand="block">
                        <IonIcon icon={qrCode}></IonIcon>
                        Take Attendence
                    </IonButton>
                </IonCardContent>

            </IonCard>
        </>
    )
}