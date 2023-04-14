import { useRef } from "react";
import { OverlayEventDetail } from '@ionic/core/components';
import { IonModal, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonContent, IonItem, IonLabel, IonInput, useIonToast } from "@ionic/react";
import { useMutation } from "@tanstack/react-query";
import { updateUsername } from "../../../api/userAPIs";
import { useDispatch } from "react-redux";
import { userAction } from "../../../redux/userSlice";

// css
import UserMenuStyle from "../../../scss/UserMenu.module.scss";
import NotificationStyle from "../../../scss/Notification.module.scss";

export function ChangeUsername() {
    const modal = useRef<HTMLIonModalElement>(null);
    const input = useRef<HTMLIonInputElement>(null);

    const [present] = useIonToast();
    const dispatch = useDispatch();

    const changeUsername = useMutation(
        (newUsername: string) =>
            updateUsername(newUsername),
        {
            onSuccess: (data) => {
                if (data) {
                    dispatch(userAction.login(data));
                    present({
                        message: 'Username Update Success',
                        duration: 1500,
                        position: "top",
                        cssClass: NotificationStyle.ionicToast,
                    });
                }
            }
        }
    )

    function confirm() {
        modal.current?.dismiss(input.current?.value, 'confirm');
    }

    function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
        if (ev.detail.role === 'confirm') {
            changeUsername.mutate(ev.detail.data)
        }
    }

    return (
        <IonModal ref={modal} trigger="change_username" onWillDismiss={(ev) => onWillDismiss(ev)}>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start" className={UserMenuStyle.top_bar_buttons}>
                        <IonButton onClick={() => modal.current?.dismiss()}>Cancel</IonButton>
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
                    <IonInput ref={input} type="text" placeholder="new username" label="" />
                </IonItem>
            </IonContent>
        </IonModal>
    )

}