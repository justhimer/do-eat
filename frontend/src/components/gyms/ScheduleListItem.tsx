import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, useIonToast } from "@ionic/react";
import { ScheduleInterface, deleteCourseSchedule } from "../../api/coursesSchedulesAPI";
import { format, utcToZonedTime } from "date-fns-tz";
import { formatISO, isPast } from "date-fns";
import courseStyle from '../../scss/GymCourses.module.scss'
import { useMutation } from "@tanstack/react-query";
import NotificationStyle from "../../scss/Notification.module.scss";

interface ScheduleListItemInterface extends ScheduleInterface{
    refetch: ()=>void
}

export function ScheduleListItem(props:ScheduleListItemInterface) {
    const scheduledDateTime = utcToZonedTime(new Date(props.time),'Asia/Hong_Kong')
    const passedTime = isPast(new Date(props.time))
    const [present] = useIonToast();


    const deleteCourse = useMutation(()=>deleteCourseSchedule(props.schedule_id),{
        onSuccess:()=>{
            present({
                message: 'Successfully Deleted',
                duration: 1500,
                position: 'top',
                cssClass: NotificationStyle.ionicToast,
            });
            props.refetch()
        },
        onError:()=>{
            present({
                message: 'Cannot delete less than 3 Days before course',
                duration: 1500,
                position: 'top',
                cssClass: NotificationStyle.ionicToast,
            });
        }
    })

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
            <IonButton disabled={passedTime} onClick={()=>deleteCourse.mutate()}>delete</IonButton>
        </IonCard>
    </>)
}