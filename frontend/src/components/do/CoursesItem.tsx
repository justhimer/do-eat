// Ionic Component
import { IonLabel, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCard, IonChip, IonIcon, useIonToast } from "@ionic/react";
import { flameOutline, cardOutline } from "ionicons/icons"

// State Management
import { CoursesInterface, changeSelectedCourse } from "../../redux/userCourseSlice";
import { useDispatch } from "react-redux";

// Routing
import { useHistory } from "react-router";

// Date Formating
import { format, isPast } from "date-fns";

// CSS Style
import courseStyle from '../../scss/GymCourses.module.scss'
import NotificationStyle from "../../scss/Notification.module.scss";
import confirmationStyle from '../../scss/GymConfirm.module.scss'


export function CoursesItem(props: CoursesInterface) {
    const filled = props.filled >= props.quota
    const passed = isPast(new Date(props.time))
    const [present] = useIonToast();
    const presentToast = (position: 'top' | 'middle' | 'bottom', message: string) => {
        present({
            message: message,
            duration: 1500,
            position: position,
            cssClass: NotificationStyle.ionicToast,
        });
    };
    const notify = () => {
        if (passed) {
            presentToast('top', 'Course has passed already')
        } else {
            presentToast('top', 'Course is Full');
        }


    }
    const history = useHistory()
    const dispatch = useDispatch()

    const changeData = () => {
        if (passed) {
            notify()
        } else {
            dispatch(changeSelectedCourse(props))
            history.push('/do-it')
        }

    }

    const classSwitch = () => {
        if (filled || passed) {
            return courseStyle.filledCourse + ' ion-padding'
        } else {
            return 'ion-padding'
        }
    }


    return <>

        <IonCard id={`course_${props.course_id}`} onClick={changeData} className={classSwitch()}>
            <div className={courseStyle.cardSplitter}>
                <div className={courseStyle.cardLeftComponent}>
                    <img src={props.trainer_icon} className={courseStyle.cardThumbnail}></img>
                    <IonCardTitle>{props.trainer_name}</IonCardTitle>
                </div>
                <div className={courseStyle.cardContent}>
                    <IonCardHeader>
                        <br />
                        <IonCardSubtitle>{props.franchise}</IonCardSubtitle>
                        <IonCardTitle >{props.name}</IonCardTitle>
                        <IonCardSubtitle>{props.gym}</IonCardSubtitle>
                        <IonCardSubtitle>{format(new Date(props.time), "p")} | {props.duration} min</IonCardSubtitle>
                    </IonCardHeader>
                </div>
                <div className={courseStyle.cardTopRightChips}>
                    <IonChip outline={true} color="danger">
                        <IonIcon icon={flameOutline} />
                        <IonLabel>{props.calories}</IonLabel>
                    </IonChip>
                    <IonChip outline={true} color="danger">
                        <IonIcon icon={cardOutline} />
                        <IonLabel>{props.credits}</IonLabel>
                    </IonChip>
                </div>
                <div className={courseStyle.cardBottomChips}>
                    <IonChip className={confirmationStyle[props.level]}>
                        <IonLabel>{props.level} Intensity</IonLabel>
                    </IonChip>
                    {!filled ?
                        <IonChip>
                            <IonLabel>Slots Left: {props.quota - props.filled}</IonLabel>
                        </IonChip>
                        : <IonChip className={courseStyle.cardBottomChips}><IonLabel>Filled</IonLabel></IonChip>
                    }
                </div>
            </div>

        </IonCard>
    </>
}

