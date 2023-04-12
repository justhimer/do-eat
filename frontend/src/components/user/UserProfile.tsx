import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonModal, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import UserMenuStyle from "../../scss/UserMenu.module.scss";
import AppStyle from '../../scss/App.module.scss';
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useRef } from "react";
import { OverlayEventDetail } from '@ionic/core/components';
import { ChangeUsername } from "./inUserProfile/ChangeUsername";
import { ChangePassword } from "./inUserProfile/ChangePassword";

export function UserProfile() {

    const email = useSelector((state: RootState) => state.user.email);
    const userName = useSelector((state: RootState) => state.user.username);

    // const modal_username = useRef<HTMLIonModalElement>(null);
    // const input_new_username = useRef<HTMLIonInputElement>(null);

    // function confirm() {
    //     modal_username.current?.dismiss(input_new_username.current?.value, 'confirm');
    // }

    // function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    //     // if (ev.detail.role === 'confirm') {
    //     //     setMessage(`Hello, ${ev.detail.data}!`);
    //     // }
    // }

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

                {/* <IonModal ref={modal_username} trigger="change_username" onWillDismiss={(ev) => onWillDismiss(ev)}>
                    <IonHeader>
                        <IonToolbar>
                            <IonButtons slot="start" className={UserMenuStyle.top_bar_buttons}>
                                <IonButton onClick={() => modal_username.current?.dismiss()}>Cancel</IonButton>
                            </IonButtons>
                            <IonTitle>Username</IonTitle>
                            <IonButtons slot="end" className={UserMenuStyle.top_bar_buttons}>
                                <IonButton onClick={() => confirm()}>
                                    Confirm
                                </IonButton>
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent className="ion-padding">
                        <IonItem>
                            <IonLabel position="stacked">Enter new user name:</IonLabel>
                            <IonInput ref={input_new_username} type="text" placeholder="new username" />
                        </IonItem>
                    </IonContent>
                </IonModal>

                <IonModal ref={modal} trigger="change_password" onWillDismiss={(ev) => onWillDismiss(ev)}>
                    <IonHeader>
                        <IonToolbar>
                            <IonButtons slot="start" className={UserMenuStyle.top_bar_buttons}>
                                <IonButton onClick={() => modal.current?.dismiss()}>Cancel</IonButton>
                            </IonButtons>
                            <IonTitle>Password</IonTitle>
                            <IonButtons slot="end" className={UserMenuStyle.top_bar_buttons}>
                                <IonButton onClick={() => confirm()}>
                                    Confirm
                                </IonButton>
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent className="ion-padding">
                        <IonItem>
                            <IonLabel position="stacked">Enter current password:</IonLabel>
                            <IonInput ref={input} type="password" placeholder="current password" />
                        </IonItem>
                        <IonItem>
                            <IonLabel position="stacked">Enter new password:</IonLabel>
                            <IonInput ref={input} type="password" placeholder="new password" />
                        </IonItem>
                    </IonContent>
                </IonModal> */}

            </IonContent>
        </IonPage >
    )
}