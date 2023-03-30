import { IonButton, useIonToast } from "@ionic/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { userAction } from "../../redux/userSlice";
import NotificationStyle from "../../scss/Notification.module.scss";
import UserStyle from '../../scss/User.module.scss';

export function Logout() {

    // toast
    const [present] = useIonToast();
    const presentToast = (position: 'top' | 'middle' | 'bottom') => {
        present({
            message: 'Logout Success',
            duration: 1500,
            position: position,
            cssClass: NotificationStyle.ionicToast,
        });
    };

    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.users.isAuthenticated);

    function logout() {
        if (isAuthenticated) {
            dispatch(userAction.logout());
            presentToast('top');
        }
    }

    return (
        <IonButton onClick={logout} className={UserStyle.button}>Logout</IonButton>
    )
}