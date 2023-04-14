import { IonLabel, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCard, IonChip, IonIcon, useIonToast } from "@ionic/react";
import courseStyle from '../../scss/GymCourses.module.scss'
import { flameOutline, cardOutline } from "ionicons/icons"
import {
    format,
} from "date-fns";
import NotificationStyle from "../../scss/Notification.module.scss";
import { CoursesInterface, changeSelectedCourse} from "../../redux/userCourseSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useHistory } from "react-router";

export function CoursesItem(props: CoursesInterface) {
    const filled = props.filled < props.quota
    const [present] = useIonToast();
    const presentToast = (position: 'top' | 'middle' | 'bottom') => {
        present({
            message: 'Course is full!',
            duration: 1500,
            position: position,
            cssClass: NotificationStyle.ionicToast,
        });
    };
    const notify = () => {
        presentToast('top');
    }
    const history = useHistory()
    const dispatch = useDispatch()
    
    const changeData = ()=>{

        dispatch(changeSelectedCourse(props))
        history.push('/do-it')
    }


    return <>
        <IonCard id={`course_${props.course_id}`} onClick={filled ? changeData : notify} className={`${!filled ? courseStyle.filledCourse : null}`}>
            <div className={courseStyle.cardSplitter}>
                <div className={courseStyle.cardLeftComponent}>
                    <img src={`${process.env.REACT_APP_API_SERVER}/file/trainers/default_trainer.png`} className={courseStyle.cardThumbnail}></img>
                    <IonCardTitle>{props.trainer_name}</IonCardTitle>
                </div>
                <div className={courseStyle.cardContent}>
                    <IonCardHeader>
                        <IonCardSubtitle>{props.franchise}</IonCardSubtitle>
                        <IonCardTitle>{props.name}</IonCardTitle>
                        <IonCardSubtitle>{props.gym}</IonCardSubtitle>
                        <IonCardSubtitle>{format(new Date(props.time), "p")} | {props.duration} min</IonCardSubtitle>
                    </IonCardHeader>
                </div>
                <div className={courseStyle.cardTopChips}>
                    <IonChip >
                        <IonIcon icon={flameOutline} />
                        <IonLabel>{props.calories}</IonLabel>
                    </IonChip>
                    <IonChip>
                        <IonIcon icon={cardOutline} />
                        <IonLabel>{props.credits}</IonLabel>
                    </IonChip>
                </div>
                {filled ?
                    <IonChip className={courseStyle.cardBottomChips}>
                        <IonLabel>Slots Left: {props.quota - props.filled}</IonLabel>
                    </IonChip>
                    : <IonChip className={courseStyle.cardBottomChips}><IonLabel>Filled</IonLabel></IonChip>
                }
            </div>
            
        </IonCard>
    </>
}

