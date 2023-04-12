import { IonBackButton, IonButton, IonCard, IonCardSubtitle, IonCardTitle, IonChip, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonNavLink, IonPage, IonRow, IonTitle, IonToolbar, useIonRouter, useIonToast, useIonViewDidEnter, useIonViewDidLeave, useIonViewWillEnter, useIonViewWillLeave } from "@ionic/react";
import ConfirmationStyle from '../../../scss/GymConfirm.module.scss'
import { cardOutline, flameOutline } from "ionicons/icons";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import format from "date-fns/format";
import { utcToZonedTime } from 'date-fns-tz'
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { courseJoin } from "../../../api/userScheduleAPI";
import { fetchUserInfo, fetchUserSubscribed } from "../../../api/userAPIs";
import NotificationStyle from "../../../scss/Notification.module.scss";
import { GymPopup } from "../GymPopup";
import { queryClient } from "../../..";
import { useHistory } from "react-router";
import { fetchCredits } from "../../../api/creditTransactionsAPI";
import { Router } from "workbox-routing";


export interface GymPopupInterface {
    name: string;
    gym: string;
    date: string;
    time: string;
    costs: number;
    credits: number;
    subPlan: number;
    dismiss: () => void;
    join: () => void;

}

export function GymConfirmation() {

    const history = useHistory()
    const selectedCourse = useSelector((state: RootState) => state.userCourse)
    const [popupBoolean, setPopupBoolean] = useState(false)

    const [date, setDate] = useState<Date>(new Date())
    useEffect(() => {
        setDate(utcToZonedTime(new Date(selectedCourse.time), "Asia/Hong_Kong"))
    }, [selectedCourse])


    const [present] = useIonToast();
    const presentToast = (position: 'top' | 'middle' | 'bottom', messageDetails: string) => {
        present({
            message: messageDetails,
            duration: 1500,
            position: position,
            cssClass: NotificationStyle.ionicToast,
        });
    };
    const notify = (type: string) => {
        switch (type) {
            case "notUser":
                presentToast('top', "Please login to continue");
                break;
            case "notSub":
                presentToast('top', "You must join a subscription plan to continue");
                break;
            case "loading":
                presentToast('top', "loading...")
                break;
            case "success":
                presentToast('top', "You have successfully joined this course");
                break;
            case "noCredit":
                presentToast('top', "Not enough credits");
                break;
            case 'error':
                presentToast('top', 'Error')
        }
    }

    const userData = useQuery({
        queryKey: ["userQuery"],
        queryFn: () => fetchUserInfo(),
    })
    const creditData = useQuery({
        queryKey: ["creditQuery"],
        queryFn: () => fetchCredits(),
    })

    useIonViewDidLeave(() => {
        userData.remove()
        creditData.remove()
        setPopupBoolean(false)
    })


    const containerClick = async () => {
        console.log("loadedUser", userData.data, "loading ", userData.isLoading, "PREVIOUS DATA ", userData.isPreviousData)
        if (!userData.isLoading && !userData.isError && userData.data) {
            if (!userData.isLoading && !userData.isError && userData.data.sub_plan_id) {
                setPopupBoolean(true)
            } else {
                notify('notSub')
                return
            }
        } else {
            notify('notUser')
            return
        }
        return
    }

    const attemptJoinCourse = async () => {
        const joining = await courseJoin(selectedCourse.this_id)

        if (joining) {
            notify('success')
            history.push('/do-tab')
        } else {
            notify('error')
        }
    }


    return (
        <IonPage >
            <IonHeader >
                <IonToolbar >
                    <IonNavLink routerDirection="back" slot="start">
                        <IonBackButton></IonBackButton>
                    </IonNavLink>
                    <IonTitle>Do "It"</IonTitle>
                </IonToolbar>
            </IonHeader>
            {popupBoolean ? <GymPopup name={selectedCourse.name} gym={selectedCourse.gym} date={format(date, "E, dd MMM ")} time={format(date, "hh:mm aaa")} costs={selectedCourse.credits} credits={creditData.data} dismiss={() => setPopupBoolean(false)} join={attemptJoinCourse} subPlan={userData.data.sub_plan_id} /> : <></>}
            <IonContent fullscreen>
                <div className={ConfirmationStyle.icon_container}>
                    <img src={`${process.env.REACT_APP_API_SERVER}/file/trainers/${selectedCourse.trainer_icon}`} alt="" className={ConfirmationStyle.icon} />
                </div>

                <div className={ConfirmationStyle.title}>
                    <h2>{selectedCourse.trainer_name}</h2>
                </div>

                <IonGrid>
                    <IonRow>
                        <IonCol><IonCard className={ConfirmationStyle.button}>

                            <IonCardTitle>  {selectedCourse.calorise} <IonIcon icon={flameOutline} /></IonCardTitle>
                        </IonCard></IonCol>
                        <IonCol><IonCard className={ConfirmationStyle.button}>

                            <IonCardTitle>  {selectedCourse.credits} <IonIcon icon={cardOutline} /></IonCardTitle>
                        </IonCard></IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol>
                            <IonList className={ConfirmationStyle.menu_list}>
                                <IonItem className={ConfirmationStyle.itemHead} >
                                    <IonLabel>{selectedCourse.gym}</IonLabel>
                                </IonItem>
                                <IonItem className={ConfirmationStyle.itemHead} >
                                    <IonLabel>{selectedCourse.name} <IonChip className={ConfirmationStyle[selectedCourse.level]}>{selectedCourse.level} Intensity</IonChip></IonLabel>
                                </IonItem>
                                <IonItem className={ConfirmationStyle.item} >
                                    <IonLabel>{format(date, "E, dd MMM ")}</IonLabel>
                                    <IonLabel>{format(date, "hh:mm aaa")}</IonLabel>
                                </IonItem>
                                <IonItem className={ConfirmationStyle.item_last}>
                                    <IonLabel>Slots remaining</IonLabel>
                                    <IonLabel>{selectedCourse.quota - selectedCourse.filled}</IonLabel>
                                </IonItem>
                            </IonList>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol><IonButton className={ConfirmationStyle.bigButton} onClick={containerClick}>Register Now</IonButton></IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage >
    )
}
