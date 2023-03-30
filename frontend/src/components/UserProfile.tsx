import { IonButton, IonCol, IonGrid, IonRow } from "@ionic/react";
import UserProfileStyle from "../scss/UserProfile.module.scss";

export function UserProfile() {
    return (
        <>
            <IonGrid>
                <IonRow>
                    <IonCol><IonButton expand="block">My Calories</IonButton></IonCol>
                    <IonCol><IonButton expand="block">My Credits</IonButton></IonCol>
                </IonRow>
            </IonGrid>
        </>
    )
}