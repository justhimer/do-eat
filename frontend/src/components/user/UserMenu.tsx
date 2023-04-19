import { IonButton, IonCol, IonGrid, IonItem, IonLabel, IonList, IonRefresher, IonRefresherContent, IonRow, IonSpinner, RefresherEventDetail, useIonViewWillEnter } from "@ionic/react";
import { Logout } from "../auth/Logout";
import { useHistory } from "react-router";
import { fetchProfilePic, fetchUserSubscriptionDetails } from "../../api/userAPIs";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { fetchCredits } from "../../api/creditTransactionsAPI";
import { fetchCalories } from "../../api/calorieTransactionAPIs";

// css
import UserMenuStyle from "../../scss/UserMenu.module.scss";
import UserStyle from '../../scss/User.module.scss';

export function UserMenu() {

    const history = useHistory();

    const userName = useSelector((state: RootState) => state.user.username);
    // const [isLoadedPic, setIsLoadedPic] = useState<boolean>(false);

    const { data: icon, isLoading, refetch, remove } = useQuery({
        queryKey: ["icon"],
        queryFn: fetchProfilePic,
    });

    const { data: calories, refetch: refetchCalories } = useQuery({
        queryKey: ["calories"],
        queryFn: fetchCalories,
    });

    const { data: credits, refetch: refetchCredits } = useQuery({
        queryKey: ["credits"],
        queryFn: fetchCredits,
    });

    const { data: isCreditUnlimited, refetch: refetchIsCreditUnlimited } = useQuery({
        queryKey: ["is_credit_unlimited"],
        queryFn: async () => {
            const subscriptionDetails = await fetchUserSubscriptionDetails();
            console.log('subscriptionDetails: ', subscriptionDetails);
            return subscriptionDetails.subPlan.unlimited;
        },
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

    const onOrderedFoods = () => {
        history.push("/user-orders");
    }

    useIonViewWillEnter(() => {
        refetchCalories();
        refetchCredits();
        refetchIsCreditUnlimited();
    })

    function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
        refetchCalories().then(() => {
            refetchCredits().then(() => {
                refetchIsCreditUnlimited().then(() => {
                    event.detail.complete();
                })
            });
        });
    }

    return (
        <>

            <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                <IonRefresherContent></IonRefresherContent>
            </IonRefresher>

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
                    <IonCol><IonButton expand="block" className={UserMenuStyle.button}>Calories: {calories}</IonButton></IonCol>
                    <IonCol><IonButton expand="block" className={UserMenuStyle.button}>Credits: {isCreditUnlimited ? 'ထ' : credits}</IonButton></IonCol>
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
                            <IonItem button detail={true} className={UserMenuStyle.item_last} onClick={onOrderedFoods}>
                                <IonLabel>Ordered Foods</IonLabel>
                            </IonItem>
                            {/* <IonItem button detail={true} className={UserMenuStyle.item_last}>
                                <IonLabel>History</IonLabel>
                            </IonItem> */}
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