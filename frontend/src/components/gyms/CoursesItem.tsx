import { IonLabel, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCard, IonChip, IonIcon } from "@ionic/react";
import courseStyle from '../../scss/GymCourses.module.scss'
import { CoursesInterface } from "../../pages/Do";
import { flameOutline, cardOutline } from "ionicons/icons"
import {
    format,
} from "date-fns";
import 'react-toastify/dist/ReactToastify.css';


export interface CoursesItemInterface {
    courseItem: CoursesInterface;
    pick_function: (course: CoursesInterface) => void;
}


export function CoursesItem(props: CoursesItemInterface) {
    const filled = props.courseItem.filled < props.courseItem.quota
    const notify = () => {

    }

    return <>
        <IonCard id={`course_${props.courseItem.course_id}`} onClick={filled ? () => props.pick_function(props.courseItem) : notify} className={`${!filled ? courseStyle.filledCourse : null}`}>
            <div className={courseStyle.cardSplitter}>
                <div className={courseStyle.cardLeftComponent}>
                    <img src={`${process.env.REACT_APP_API_SERVER}/file/trainers/default_trainer.png`} className={courseStyle.cardThumbnail}></img>
                    <IonCardTitle>{props.courseItem.trainer_name}</IonCardTitle>
                </div>
                <div className={courseStyle.cardContent}>
                    <IonCardHeader>
                        <IonCardSubtitle>{props.courseItem.franchise}</IonCardSubtitle>
                        <IonCardTitle>{props.courseItem.name}</IonCardTitle>
                        <IonCardSubtitle>{props.courseItem.gym}</IonCardSubtitle>
                        <IonCardSubtitle>{format(new Date(props.courseItem.time), "p")} | {props.courseItem.duration} min</IonCardSubtitle>
                    </IonCardHeader>
                </div>
                <div className={courseStyle.cardTopChips}>
                    <IonChip >
                        <IonIcon icon={flameOutline} />
                        <IonLabel>{props.courseItem.calorise}</IonLabel>
                    </IonChip>
                    <IonChip>
                        <IonIcon icon={cardOutline} />
                        <IonLabel>{props.courseItem.credits}</IonLabel>
                    </IonChip>
                </div>
                {filled ?
                    <IonChip className={courseStyle.cardBottomChips}>
                        <IonLabel>Slots Left: {props.courseItem.quota - props.courseItem.filled}</IonLabel>
                    </IonChip>
                    : <IonChip className={courseStyle.cardBottomChips}><IonLabel>Filled</IonLabel></IonChip>
                }
            </div>
            
        </IonCard>
    </>
}

