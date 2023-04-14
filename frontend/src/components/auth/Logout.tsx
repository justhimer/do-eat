import { IonButton, useIonToast } from "@ionic/react";
import { useDispatch, useSelector } from "react-redux";
import { gymAction } from "../../redux/gymSlice";
import { RootState } from "../../redux/store";
import { userAction } from "../../redux/userSlice";
import NotificationStyle from "../../scss/Notification.module.scss";
import UserStyle from '../../scss/User.module.scss';

export function Logout({ remove: removeCache }: {
    remove: () => void
}) {

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
    const isUserLoggedIn = useSelector((state: RootState) => state.user.isAuthenticated);
    const isGymLoggedIn = useSelector((state: RootState) => state.gym.isAuthenticated);

    function logout() {
        removeCache();
        if (isUserLoggedIn) {
            dispatch(userAction.logout());
            presentToast('top');
        }
        if (isGymLoggedIn) {
            dispatch(gymAction.logout());
            presentToast('top');
        }
    }

    return (
        <IonButton onClick={logout} className={UserStyle.button}>Logout</IonButton>
    )
}