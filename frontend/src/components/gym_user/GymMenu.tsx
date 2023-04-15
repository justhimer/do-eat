// css
import UserMenuStyle from "../../scss/UserMenu.module.scss";
import UserStyle from '../../scss/User.module.scss';

// library
import { IonGrid, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel } from "@ionic/react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Logout } from "../auth/Logout";
import { useHistory } from "react-router";

export function GymMenu() {

    const history = useHistory();
    const gymUserName = useSelector((state: RootState) => state.gym.username);

    const onProfile = () => {
        history.push("/gym-profile");
    }

    const onCourses = () => {
        history.push("/gym-coming-courses");
    }

    const onFoodOrders = () => {
        history.push("/gym-food-orders");
    }

    return (
        <>
            <div className={UserMenuStyle.icon_container}>
                <img src="./assets/gym_image/default_gym_icon.png" alt="" className={UserMenuStyle.icon_square} />
            </div>

            <div className={UserStyle.title}>
                <h2>{gymUserName}</h2>
            </div>

            <IonGrid>
                {/* <IonRow>
                    <IonCol><IonButton expand="block" className={UserMenuStyle.button}>Calories: { }</IonButton></IonCol>
                    <IonCol><IonButton expand="block" className={UserMenuStyle.button}>Credits: { }</IonButton></IonCol>
                </IonRow> */}

                <IonRow>
                    <IonCol>
                        <IonList className={UserMenuStyle.menu_list}>
                            <IonItem button detail={true} className={UserMenuStyle.item} onClick={onProfile}>
                                <IonLabel>Gym Profile</IonLabel>
                            </IonItem>
                            <IonItem button detail={true} className={UserMenuStyle.item} onClick={onCourses}>
                                <IonLabel>Coming Courses</IonLabel>
                            </IonItem>
                            <IonItem button detail={true} className={UserMenuStyle.item_last} onClick={onFoodOrders}>
                                <IonLabel>Food Orders</IonLabel>
                            </IonItem>
                            {/* <IonItem button detail={true} className={UserMenuStyle.item}>
                                <IonLabel>Trainers</IonLabel>
                            </IonItem>
                            <IonItem button detail={true} className={UserMenuStyle.item_last}>
                                <IonLabel>Statistics</IonLabel>
                            </IonItem> */}
                        </IonList>
                    </IonCol>
                </IonRow>

                <IonRow>
                    <IonCol><Logout remove={() => { }} /></IonCol>
                </IonRow>

            </IonGrid>
        </>
    )
}