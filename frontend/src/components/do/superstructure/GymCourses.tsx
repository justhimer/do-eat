import { IonBackButton, IonContent, IonHeader, IonNavLink, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { CoursesDatePick } from "../CoursesDatePick";
import { CoursesPick } from "../CoursesPick";



export function GymCourses() {


    return (
        <IonPage >
            <IonHeader >
                <IonToolbar >
                    <IonNavLink routerDirection="back" slot="start">
                        <IonBackButton></IonBackButton>
                    </IonNavLink>
                    <IonTitle>Do What</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen class="ion-padding">
                <CoursesDatePick />
                <CoursesPick />
            </IonContent>
        </IonPage >
    )
}