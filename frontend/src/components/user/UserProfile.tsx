// css
import UserMenuStyle from "../../scss/UserMenu.module.scss";

// library
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonModal, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useRef } from "react";
import { OverlayEventDetail } from '@ionic/core/components';
import { ChangeUsername } from "./inUserProfile/ChangeUsername";
import { ChangePassword } from "./inUserProfile/ChangePassword";

export function UserProfile() {

    const email = useSelector((state: RootState) => state.user.email);
    const userName = useSelector((state: RootState) => state.user.username);

    return (
        <IonPage >
            <IonHeader >
                <IonToolbar >
                    <IonButton slot="start">
                        <IonBackButton default-href="/"></IonBackButton>
                    </IonButton>
                    <IonTitle>User Profile</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonList className={UserMenuStyle.list}>
                    <IonItem button detail={false} className={UserMenuStyle.item}>
                        <IonLabel className={UserMenuStyle.label}>
                            <h2 className={UserMenuStyle.width_30}>Email:</h2>
                            <p className={UserMenuStyle.width_70}>{email}</p>
                        </IonLabel>
                    </IonItem>
                    <IonItem id="change_username" button detail={true} className={UserMenuStyle.item}>
                        <IonLabel className={UserMenuStyle.label}>
                            <h2 className={UserMenuStyle.width_30}>Username:</h2>
                            <p className={UserMenuStyle.width_70}>{userName}</p>
                        </IonLabel>
                    </IonItem>
                    <IonItem id="change_password" button detail={true} className={UserMenuStyle.item_last}>
                        <IonLabel className={UserMenuStyle.label}>
                            <h2 className={UserMenuStyle.width_30}>Password:</h2>
                            <p className={UserMenuStyle.width_70}>click to change</p>
                        </IonLabel>
                    </IonItem>
                </IonList>

                <ChangeUsername />
                <ChangePassword />

            </IonContent>
        </IonPage >
    )
}