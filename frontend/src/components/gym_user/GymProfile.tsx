// css
import { IonPage, IonHeader, IonToolbar, IonButton, IonBackButton, IonTitle, IonContent, IonList, IonItem, IonLabel, useIonViewWillEnter } from "@ionic/react";

// library
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import UserMenuStyle from "../../scss/UserMenu.module.scss";
import { fetchGymInfo } from "../../api/gymAPIs";
import { useQuery } from "@tanstack/react-query";

export function GymProfile() {

    const userName = useSelector((state: RootState) => state.gym.username);
    const gymName = useSelector((state: RootState) => state.gym.name);

    const { data: gymProfile, isLoading, refetch, remove } = useQuery({
        queryKey: ["gym_profile"],
        queryFn: async () => {
            const gymProfile = await fetchGymInfo();
            // console.log(gymProfile);
            return gymProfile;
        },
    });

    useIonViewWillEnter(() => {
        refetch();
    }, [])

    return (
        <IonPage >
            <IonHeader >
                <IonToolbar >
                    <IonButton slot="start">
                        <IonBackButton default-href="/"></IonBackButton>
                    </IonButton>
                    <IonTitle>Gym Profile</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonList className={UserMenuStyle.list}>

                    <IonItem button detail={false} className={UserMenuStyle.item}>
                        <IonLabel className={UserMenuStyle.label}>
                            <h2 className={UserMenuStyle.width_30}>Username:</h2>
                            <p className={UserMenuStyle.width_70}>{userName}</p>
                        </IonLabel>
                    </IonItem>

                    <IonItem button detail={false} className={UserMenuStyle.item}>
                        <IonLabel className={UserMenuStyle.label}>
                            <h2 className={UserMenuStyle.width_30}>Gym Name:</h2>
                            <p className={UserMenuStyle.width_70}>{gymName}</p>
                        </IonLabel>
                    </IonItem>

                    <IonItem button detail={false} className={UserMenuStyle.item}>
                        <IonLabel className={UserMenuStyle.label}>
                            <h2 className={UserMenuStyle.width_30}>Franchise:</h2>
                            <p className={UserMenuStyle.width_70}>{gymProfile ? gymProfile.franchise.name : ""}</p>
                        </IonLabel>
                    </IonItem>

                    <IonItem button detail={false} className={UserMenuStyle.item}>
                        <IonLabel className={UserMenuStyle.width_30}>
                            <h2>Address:</h2>
                        </IonLabel>
                        <p className={UserMenuStyle.width_70_right}>{gymProfile ? gymProfile.address : ""}</p>
                    </IonItem>

                    <IonItem button detail={false} className={UserMenuStyle.item}>
                        <IonLabel className={UserMenuStyle.label}>
                            <h2 className={UserMenuStyle.width_30}>Email:</h2>
                            <p className={UserMenuStyle.width_70}>{gymProfile ? gymProfile.franchise.email : ""}</p>
                        </IonLabel>
                    </IonItem>

                    <IonItem button detail={false} className={UserMenuStyle.item}>
                        <IonLabel className={UserMenuStyle.label}>
                            <h2 className={UserMenuStyle.width_70}>24 hrs Service:</h2>
                            <p className={UserMenuStyle.width_30}>{gymProfile ? (gymProfile.no_close ? 'Yes' : 'No') : ""}</p>
                        </IonLabel>
                    </IonItem>

                    <IonItem button detail={false} className={UserMenuStyle.item}>
                        <IonLabel className={UserMenuStyle.label}>
                            <h2 className={UserMenuStyle.width_70}>Opening Hour:</h2>
                            <p className={UserMenuStyle.width_30}>{gymProfile ? (gymProfile.opening_hour ? gymProfile.opening_hour : "N/A") : ""}</p>
                        </IonLabel>
                    </IonItem>

                    <IonItem button detail={false} className={UserMenuStyle.item_last}>
                        <IonLabel className={UserMenuStyle.label}>
                            <h2 className={UserMenuStyle.width_70}>Closing Hour:</h2>
                            <p className={UserMenuStyle.width_30}>{gymProfile ? (gymProfile.closing_hour ? gymProfile.closing_hour : "N/A") : ""}</p>
                        </IonLabel>
                    </IonItem>

                </IonList>

            </IonContent>
        </IonPage >
    )
}