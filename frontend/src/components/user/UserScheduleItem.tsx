import { IonItem, IonThumbnail, IonLabel, IonIcon, IonChip, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonList } from "@ionic/react";
import { calendarClear, calendarClearOutline, calendarSharp, checkboxOutline, checkboxSharp, flameOutline, flameSharp, hourglassSharp, timeSharp } from "ionicons/icons";
import { utcToZonedTime } from 'date-fns-tz';
import format from "date-fns/format";

// css
import UserMenuStyle from "../../scss/UserMenu.module.scss";
import { useState } from "react";

export interface UserScheduleItemProps {
    courseName: string;
    time: string;
    duration: number;
    calories: number;
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
                    </IonList>
                    <br />
                    <IonButton>Cancel</IonButton>
                </IonCardContent>

            </IonCard>

            {/* <IonCard>
                <IonCardHeader>
                    <IonCardTitle>{props.courseName}</IonCardTitle>
                    <IonCardSubtitle>
                        <IonIcon icon={calendarSharp} />
                        {props.time.split('T')[0]}
                    </IonCardSubtitle>
                </IonCardHeader>

                <IonCardContent>
                    <IonChip >
                        <IonIcon icon={timeSharp} />
                        <IonLabel>{props.time.split('T')[1]}</IonLabel>
                    </IonChip>
                    <br />
                    <IonChip >
                        <IonIcon icon={hourglassSharp} />
                        <IonLabel>{props.duration} mins</IonLabel>
                    </IonChip>
                    <br />
                    <IonChip >
                        <IonIcon icon={checkboxOutline} />
                        <IonLabel>{props.attendence}</IonLabel>
                    </IonChip>
                    <br />
                    <IonChip >
                        <IonIcon icon={flameSharp} />
                        <IonLabel>{props.calories}</IonLabel>
                    </IonChip>
                </IonCardContent>

                <IonButton fill="clear">Action 1</IonButton>
                <IonButton fill="clear">Action 2</IonButton>
            </IonCard> */}

            {/* <IonLabel>{props.courseName}</IonLabel>
            <IonChip >
                <IonIcon icon={calendarSharp} />
                <IonLabel>{props.time.split('T')[0]}</IonLabel>
            </IonChip>
            <br />
            <IonChip >
                <IonIcon icon={timeSharp} />
                <IonLabel>{props.time.split('T')[1]}</IonLabel>
            </IonChip>
            <br />
            <IonChip >
                <IonIcon icon={hourglassSharp} />
                <IonLabel>{props.duration} mins</IonLabel>
            </IonChip>
            <br />
            <IonChip >
                <IonIcon icon={checkboxOutline} />
                <IonLabel>{props.attendence}</IonLabel>
            </IonChip>
            <br />
            <IonChip >
                <IonIcon icon={flameSharp} />
                <IonLabel>{props.calories}</IonLabel>
            </IonChip> */}
        </>
    )
}