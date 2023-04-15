import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from "@ionic/react";
import { ScheduleInterface } from "../../api/coursesSchedulesAPI";
import { format, utcToZonedTime } from "date-fns-tz";
import { formatISO, isPast } from "date-fns";
import courseStyle from '../../scss/GymCourses.module.scss'

export function ScheduleListItem(props:ScheduleInterface) {
    const scheduledDateTime = utcToZonedTime(new Date(props.time),'Asia/Hong_Kong')
    const passedTime = isPast(new Date(props.time))

    function greyScaleControl(boolean:boolean){
        if(boolean){
            return `ion-padding + ${courseStyle.filledCourse}`
        }else{
            return 'ion-padding'
        }
    }
    const isoDateTime = formatISO(new Date(props.time))
    return (<>
        <IonCard className={greyScaleControl(passedTime)}>
            <IonCardHeader>
                <IonCardTitle>{format(scheduledDateTime,'p | dd/MM/yyyy')} | {props.trainer_name}</IonCardTitle>
                <IonCardSubtitle>Quota: {props.quota}</IonCardSubtitle>
            </IonCardHeader>
            <IonButton disabled={passedTime}>delete</IonButton>
        </IonCard>
    </>)
}