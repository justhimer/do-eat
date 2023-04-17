// css
import UserMenuStyle from "../../scss/UserMenu.module.scss";
import AppStyle from "../../scss/App.module.scss";
import courseStyle from '../../scss/GymCourses.module.scss'
import NotificationStyle from "../../scss/Notification.module.scss";

import { IonItem, IonThumbnail, IonLabel, IonIcon, IonChip, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonList, useIonToast } from "@ionic/react";
import { calendarSharp, locationOutline } from "ionicons/icons";
import { utcToZonedTime } from 'date-fns-tz';
import format from "date-fns/format";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { userCancelBookedCourse } from "../../api/userScheduleAPI";

export interface UserScheduleItemProps {
    userScheduleID: number;
    courseScheduleID: number
    courseName: string;
    courseType: string;
    time: string;
    duration: number;
    gymName: string;
    address: string;
    attendence: string;
    toRefetch: () => void;
}

export function UserScheduleItem(props: UserScheduleItemProps) {

    const [date, setDate] = useState<Date>(utcToZonedTime(new Date(props.time), "Asia/Hong_Kong"));

    const [present] = useIonToast();

    function onCancel() {
        cancelBooking.mutate(props.userScheduleID);
    }

    const cancelBooking = useMutation(
        (user_schedule_id: number) => {
            const data = userCancelBookedCourse(user_schedule_id);
            return data;
        },
        {
            onSuccess: (data) => {
                if (data) {
                    props.toRefetch();
                    present({
                        message: 'Cancel Booking Success',
                        duration: 1500,
                        position: "top",
                        cssClass: NotificationStyle.ionicToast,
                    });
                }
            },
            onError: () => {
                present({
                    message: 'Cannot Cancel Booking',
                    duration: 1500,
                    position: "top",
                    cssClass: NotificationStyle.ionicToast,
                });
            }
        }
    )

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
                    <IonCardSubtitle>Class #{props.courseScheduleID}</IonCardSubtitle>
                    {/* <IonCardSubtitle>
                        <IonIcon icon={calendarSharp} />
                        {props.time.split('T')[0]}
                        ({format(date, "E")})
                    </IonCardSubtitle> */}
                </IonCardHeader>

                <IonCardContent>
                    <IonList>
                        <IonItem className={UserMenuStyle.item}>
                            <IonLabel>Date:</IonLabel>
                            <IonLabel>{format(date, "dd MMM yy, E")}</IonLabel>
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
                            <IonLabel>Attendence:</IonLabel>
                            <IonLabel>{props.attendence}</IonLabel>
                        </IonItem>
                        <IonItem className={UserMenuStyle.item_last}>
                            <IonLabel className={AppStyle.bold}>{props.gymName}</IonLabel>
                        </IonItem>
                        <IonItem className={UserMenuStyle.item_last}>
                            <IonIcon icon={locationOutline} />
                            <IonLabel></IonLabel>
                            <p>{props.address}</p>
                        </IonItem>
                    </IonList>
                    <br />
                    {
                        props.attendence === "pending" && <IonButton expand="block" onClick={onCancel}>Cancel</IonButton>
                    }
                </IonCardContent>

            </IonCard>
        </>
    )
}