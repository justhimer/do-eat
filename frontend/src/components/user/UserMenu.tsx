import { IonButton, IonCol, IonGrid, IonItem, IonLabel, IonList, IonRow, IonSpinner } from "@ionic/react";
import UserMenuStyle from "../../scss/UserMenu.module.scss";
import UserStyle from '../../scss/User.module.scss';
import { Logout } from "../auth/Logout";
import { useHistory } from "react-router";
import { fetchProfilePic } from "../../api/userAPIs";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";

export function UserMenu() {

    const history = useHistory();

    const userName = useSelector((state: RootState) => state.user.username);
    // const [isLoadedPic, setIsLoadedPic] = useState<boolean>(false);

    const { data: icon, isLoading, refetch, remove } = useQuery({
        queryKey: ["icon"],
        queryFn: fetchProfilePic,
    });

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
                {isLoading ? (
                    // <img src="./assets/user_image/loading.gif" alt="" className={UserMenuStyle.icon} />
                    <IonSpinner></IonSpinner>
                ) : (
                    <img src={icon} alt="" className={UserMenuStyle.icon} />
                )}
            </div>

            <div className={UserStyle.title}>
                <h2>{userName}</h2>
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
                    <IonCol><Logout remove={remove} /></IonCol>
                </IonRow>

            </IonGrid>

        </>
    )
}