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
                        <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
                        <IonCardTitle>Card Title</IonCardTitle>
                        <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
                        <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
                    </IonCardHeader>
                </div>
            </div>
        </IonCard>
    </>
}

