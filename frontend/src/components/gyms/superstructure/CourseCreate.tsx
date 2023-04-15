import { IonBackButton, IonContent, IonHeader, IonNavLink, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { CourseForm } from "../courseForm";

export function CourseCreate() {

    return <IonPage >
        <IonHeader >
                <IonToolbar >
                    <IonNavLink routerDirection="back" slot="start">
                        <IonBackButton></IonBackButton>
                    </IonNavLink>
                    <IonTitle>"What's" Up</IonTitle>
                </IonToolbar>
            </IonHeader>
        <IonContent fullscreen>
            <CourseForm mode='POST' />
        </IonContent>
    </IonPage >
}