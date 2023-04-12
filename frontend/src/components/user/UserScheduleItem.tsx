import { IonItem, IonThumbnail, IonLabel } from "@ionic/react";

export interface UserScheduleItemProps {
    courseName: string;
    time: string;
    duration: number;
    calories: number;
    attendence: string;
}

export function UserScheduleItem(props: UserScheduleItemProps) {
    return (
        <>
            <IonItem>
                {/* <IonThumbnail slot="start">
                    <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
                </IonThumbnail> */}
                <IonLabel>
                    1: {props.courseName} <br />
                    2: {props.time} <br />
                    3: {props.duration} <br />
                    4: {props.calories} <br />
                    5: {props.attendence} <br />
                </IonLabel>
            </IonItem>
        </>
    )
}