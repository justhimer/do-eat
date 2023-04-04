import { IonButton, IonCol, IonGrid, IonItem, IonLabel, IonList, IonRow } from "@ionic/react";
import UserMenuStyle from "../../scss/UserMenu.module.scss";
import UserStyle from '../../scss/User.module.scss';
import { Logout } from "../auth/Logout";
import { useHistory } from "react-router";

export function UserMenu() {

    const history = useHistory();

    const onProfile = () => {
        history.push("/user-profile");
    }

    const onSubscription = () => {
        history.push("/user-subscription");
    }

    const onBookedCourses = () => {
        history.push("/user-courses");
    }

    return (
        <>

            <div className={UserMenuStyle.icon_container}>
                <img src="./assets/user_image/default_user_icon.png" alt="" className={UserMenuStyle.icon} />
            </div>

            <div className={UserStyle.title}>
                <h2>Harry Porter</h2>
            </div>

            <IonGrid>
                <IonRow>
                    <IonCol><IonButton expand="block" className={UserMenuStyle.button}>My Calories</IonButton></IonCol>
                    <IonCol><IonButton expand="block" className={UserMenuStyle.button}>My Credits</IonButton></IonCol>
                </IonRow>

                <IonRow>
                    <IonCol>
                        <IonList className={UserMenuStyle.menu_list}>
                            <IonItem button detail={true} className={UserMenuStyle.item} onClick={onProfile}>
                                <IonLabel>Profile</IonLabel>
                            </IonItem>
                            <IonItem button detail={true} className={UserMenuStyle.item} onClick={onSubscription}>
                                <IonLabel>Subscription</IonLabel>
                            </IonItem>
                            <IonItem button detail={true} className={UserMenuStyle.item} onClick={onBookedCourses}>
                                <IonLabel>Booked Courses</IonLabel>
                            </IonItem>
                            <IonItem button detail={true} className={UserMenuStyle.item}>
                                <IonLabel>Ordered Foods</IonLabel>
                            </IonItem>
                            <IonItem button detail={true} className={UserMenuStyle.item_last}>
                                <IonLabel>History</IonLabel>
                            </IonItem>
                        </IonList>
                    </IonCol>
                </IonRow>

                <IonRow>
                    <IonCol><Logout /></IonCol>
                </IonRow>

            </IonGrid>

        </>
    )
}