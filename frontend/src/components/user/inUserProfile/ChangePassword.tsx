import { useRef, useState } from "react";
import { OverlayEventDetail } from '@ionic/core/components';
import { IonModal, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonContent, IonItem, IonLabel, IonInput, useIonToast } from "@ionic/react";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { userAction } from "../../../redux/userSlice";

// css
import UserMenuStyle from "../../../scss/UserMenu.module.scss";
import NotificationStyle from "../../../scss/Notification.module.scss";
import { updatePassword, validatePassword } from "../../../api/userAPIs";

export function ChangePassword() {
    const modal = useRef<HTMLIonModalElement>(null);
    const input = useRef<HTMLIonInputElement>(null);

    const [present] = useIonToast();

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const checkPassword = useMutation(
        (inputPassword: string) =>
            validatePassword(inputPassword),
        {
            onError() {
                present({
                    message: "Incorrect Password",
                    duration: 3000,
                    position: "top",
                    cssClass: NotificationStyle.ionicToast,
                });
            },
            onSuccess: () => {
                changePassword.mutate(newPassword);
            }
        }
    )

    const changePassword = useMutation(
        (newPassword: string) =>
            updatePassword(newPassword),
        {
            onSuccess: () => {
                present({
                    message: 'Password Update Success',
                    duration: 2000,
                    position: "top",
                    cssClass: NotificationStyle.ionicToast,
                });
            }
        }
    )

    function confirm() {
        if (currentPassword === newPassword) {
            present({
                message: 'New password shall be different from current',
                duration: 2000,
                position: "top",
                cssClass: NotificationStyle.ionicToast,
            });
        } else {
            modal.current?.dismiss(input.current?.value, 'confirm');
        }
    }

    function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
        if (ev.detail.role === 'confirm') {
            checkPassword.mutate(currentPassword);
        }
    }

    return (

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
                    <IonInput type="password" placeholder="current password" label="" onIonInput={(ev) => setCurrentPassword(`${ev.detail.value!}`)} />
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Enter new password:</IonLabel>
                    <IonInput type="password" placeholder="new password" label="" onIonInput={(ev) => setNewPassword(`${ev.detail.value!}`)} />
                </IonItem>
            </IonContent>
        </IonModal>

    )

}