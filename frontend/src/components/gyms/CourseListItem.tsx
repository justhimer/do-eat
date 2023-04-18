import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonIcon, IonLabel, useIonToast } from "@ionic/react";
import courseStyle from '../../scss/GymCourses.module.scss'
import confirmationStyle from '../../scss/GymConfirm.module.scss'
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { cardOutline, flameOutline } from "ionicons/icons";
import { gymCourseData } from "../../api/coursesApi";
import { sendGymCourse } from "../../redux/gymCourseSlice";




export function CourseListItem(props: gymCourseData) {
    
    const history = useHistory()
    const dispatch = useDispatch()
    
    const changeData = ()=>{
        dispatch(sendGymCourse(props))
        history.push('/details-course')
    }


    return <>
        <IonCard class='ion-padding' onClick={()=>changeData()}>
            <div className={courseStyle.cardSplitter}>
                <div className={courseStyle.cardLeftComponent}>
                    <IonCardSubtitle>Default trainer:</IonCardSubtitle>
                    <img src={props.trainer_icon} className={courseStyle.cardThumbnail}></img>
                    <IonCardTitle>{props.trainer_name}</IonCardTitle>
                </div>
                <div className={courseStyle.cardContent}>
                    <IonCardHeader>
                        <IonCardTitle>{props.name}</IonCardTitle>
                        <IonCardSubtitle>Course: {props.course_type_name}</IonCardSubtitle>
                        <IonCardSubtitle>Duration: {props.duration} min</IonCardSubtitle>
                        <IonCardSubtitle>Default quota: {props.default_quota} pax</IonCardSubtitle>
                    </IonCardHeader>
                </div>
                <div className={courseStyle.cardTopRightChips}>
                    <IonChip >
                        <IonIcon icon={flameOutline} />
                        <IonLabel>{props.calories}</IonLabel>
                    </IonChip>
                    <IonChip>
                        <IonIcon icon={cardOutline} />
                        <IonLabel>{props.credits}</IonLabel>
                    </IonChip>
                </div>
                <div className={courseStyle.cardBottomChips}>
                    <IonChip className={confirmationStyle[props.intensity_level]}>
                        <IonLabel>{props.intensity_level} Intensity</IonLabel>
                    </IonChip>
                </div>
            </div>
        </IonCard>
    </>
}