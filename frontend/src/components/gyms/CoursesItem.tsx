import { IonItem, IonLabel, IonThumbnail, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, useIonViewWillEnter, IonCard, IonCardContent } from "@ionic/react";
import courseStyle from '../../scss/GymCourses.module.scss'
import { CoursesItemInterface } from "../../pages/Do";


export function CoursesItem(props:CoursesItemInterface) {

    return <>
        <IonCard>
            <div className={courseStyle.cardSplitter}>
                <img className={courseStyle.cardThumbnail} />
                <div className={courseStyle.cardContent}>
                    <IonCardHeader>
                        <IonCardSubtitle>{props.franchise}</IonCardSubtitle>
                        <IonCardTitle>{props.name}</IonCardTitle>
                        <IonCardSubtitle>{props.gym}</IonCardSubtitle>
                        <IonCardSubtitle>{props.duration} min</IonCardSubtitle>
                    </IonCardHeader>
                </div>
            </div>
        </IonCard>
    </>
}

