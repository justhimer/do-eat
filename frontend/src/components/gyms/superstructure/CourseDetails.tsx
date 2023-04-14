import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";

export function CourseDetails() {

    return <IonPage >
        <IonHeader >
            <IonToolbar >
                <IonTitle>Course Details</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
            <h5>Course details</h5>
        </IonContent>
    </IonPage >
}