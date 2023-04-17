import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { GymQR } from "./GymQR";
import { UserQR } from "./UserQR";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonBackButton, IonContent } from "@ionic/react";

export function QR() {
    const isUserLoggedIn = useSelector((state: RootState) => state.user.isAuthenticated);
    const isGymLoggedIn = useSelector((state: RootState) => state.gym.isAuthenticated)

    return (
        <>
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>QR Code</IonTitle>
                        {/* <IonBackButton default-href="/"></IonBackButton> */}
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    {isUserLoggedIn && <UserQR />}
                    {isGymLoggedIn && <GymQR />}
                </IonContent>
            </IonPage>
        </>
    )
}