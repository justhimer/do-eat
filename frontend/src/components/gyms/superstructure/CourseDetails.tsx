import { IonBackButton, IonContent, IonHeader, IonNavLink, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

export function CourseDetails() {
    const gymData = useSelector((state:RootState)=>state.gymCourse)
    console.log(gymData)
    return (
        <IonPage >
            <IonHeader >
                <IonToolbar >
                    <IonNavLink routerDirection="back" slot="start">
                        <IonBackButton></IonBackButton>
                    </IonNavLink>
                    <IonTitle>Gyms' "What"</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                
            </IonContent>
        </IonPage >
    )
}