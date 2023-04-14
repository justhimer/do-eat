import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonIcon, IonLabel, useIonToast } from "@ionic/react";
import courseStyle from '../../scss/GymCourses.module.scss'
import {
    format,
} from "date-fns";
import NotificationStyle from "../../scss/Notification.module.scss"
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { cardOutline, flameOutline } from "ionicons/icons";



export function CourseListItem() {

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

        history.push('/do-it')
    }


    return <>
        <IonCard className={courseStyle.filledCourse}>
            <div className={courseStyle.cardSplitter}>
                <div className={courseStyle.cardLeftComponent}>
                    <img src={`${process.env.REACT_APP_API_SERVER}/file/trainers/default_trainer.png`} className={courseStyle.cardThumbnail}></img>
                    <IonCardTitle>Trainer Name</IonCardTitle>
                </div>
                <div className={courseStyle.cardContent}>
                    <IonCardHeader>
                        <IonCardTitle>Name</IonCardTitle>
                        <IonCardSubtitle>test</IonCardSubtitle>
                        <IonCardSubtitle>{format(new Date(), "p")} | duration min</IonCardSubtitle>
                    </IonCardHeader>
                </div>
                <div className={courseStyle.cardTopChips}>
                    <IonChip >
                        <IonIcon icon={flameOutline} />
                        <IonLabel>test</IonLabel>
                    </IonChip>
                    <IonChip>
                        <IonIcon icon={cardOutline} />
                        <IonLabel>test</IonLabel>
                    </IonChip>
                </div>
            </div>
        </IonCard>
    </>
}