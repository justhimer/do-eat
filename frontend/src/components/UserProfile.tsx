import { IonButton, IonCol, IonGrid, IonRow } from "@ionic/react";
import UserProfileStyle from "../scss/UserProfile.module.scss";
import UserStyle from '../scss/User.module.scss';
import { Logo } from "./Logo";
import { Logout } from "./auth/Logout";

export function UserProfile() {
    return (
        <>
            {/* <div className={UserProfileStyle.logo_container}>
                <Logo />
            </div> */}

            <div className={UserProfileStyle.icon_container}>
                <img src="./assets/user_image/default_user_icon.png" alt="" className={UserProfileStyle.icon} />
            </div>

            <div className={UserStyle.title}>
                <h2>Harry Porter</h2>
            </div>

            <IonGrid>
                <IonRow>
                    <IonCol><IonButton expand="block" className={UserProfileStyle.button}>My Calories</IonButton></IonCol>
                    <IonCol><IonButton expand="block" className={UserProfileStyle.button}>My Credits</IonButton></IonCol>
                </IonRow>
                <IonRow>
                    <IonCol><IonButton expand="block" className={UserProfileStyle.button}>Profile</IonButton></IonCol>
                </IonRow>
                <IonRow>
                    <IonCol><IonButton expand="block" className={UserProfileStyle.button}>Booked Courses</IonButton></IonCol>
                </IonRow>
                <IonRow>
                    <IonCol><IonButton expand="block" className={UserProfileStyle.button}>Ordered Food</IonButton></IonCol>
                </IonRow>
                <IonRow>
                    <IonCol><IonButton expand="block" className={UserProfileStyle.button}>History</IonButton></IonCol>
                </IonRow>
                <IonRow>
                    <IonCol><Logout/></IonCol>
                </IonRow>
            </IonGrid>
        </>
    )
}