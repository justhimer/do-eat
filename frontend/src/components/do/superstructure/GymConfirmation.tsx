import { IonBackButton, IonButton, IonButtons, IonCard, IonCardTitle, IonChip, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonModal, IonNavLink, IonPage, IonRow, IonTitle, IonToolbar, useIonToast, useIonViewDidLeave } from "@ionic/react";
import ConfirmationStyle from '../../../scss/GymConfirm.module.scss'
import { cardOutline, flameOutline } from "ionicons/icons";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import format from "date-fns/format";
import { utcToZonedTime } from 'date-fns-tz'
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { courseJoin } from "../../../api/userScheduleAPI";
import { fetchUserInfo } from "../../../api/userAPIs";
import NotificationStyle from "../../../scss/Notification.module.scss";
import { GymPopup } from "../GymPopup";

import { useHistory } from "react-router";
import { fetchCredits } from "../../../api/creditTransactionsAPI";



export interface GymPopupInterface {
    name: string;
    gym: string;
    date: string;
    time: string;
    costs: number;
    credits: number;
    subPlan: boolean;
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
        if (userData.data) {
            if (userData.data.sub_plan_id) {
                console.log("userData.data.unlimited", userData.data.subPlan.unlimited)
                if (userData.data.subPlan.unlimited){
                    setPopupBoolean(true)
                    return
                }else{
                    console.log("creditData.data<selectedCourse.credits",creditData.data<selectedCourse.credits)
                    if (creditData.data<selectedCourse.credits){
                        notify('noCredit')
                        return
                    }else{
                        setPopupBoolean(true)
                    return
                    }
                }
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

    const modal = useRef<HTMLIonModalElement>(null);

    return (
        <IonPage >
            <IonHeader >
                <IonToolbar >
                    <IonNavLink routerDirection="back" slot="start">
                        <IonBackButton></IonBackButton>
                    </IonNavLink>
                    <IonTitle>Do It</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>

                <IonModal isOpen={popupBoolean} ref={modal} className={ConfirmationStyle.confirmModal} onIonModalDidDismiss={() => setPopupBoolean(false)}>
                    {userData.data && userData.data.subscribed ? <GymPopup name={selectedCourse.name} gym={selectedCourse.gym} date={format(date, "E, dd MMM ")} time={format(date, "hh:mm aaa")} costs={selectedCourse.credits} credits={creditData.data} dismiss={() => setPopupBoolean(false)} join={attemptJoinCourse} subPlan={userData.data.subPlan.unlimited} /> : <h5>Loading</h5>}
                </IonModal>

                <div className={ConfirmationStyle.icon_container}>
                    <img src={selectedCourse.trainer_icon} alt="" className={ConfirmationStyle.icon} />
                </div>

                <div className={ConfirmationStyle.title}>
                    <h2>{selectedCourse.trainer_name}</h2>
                </div>

                <IonGrid>
                    <IonRow>
                        <IonCol><IonCard className={ConfirmationStyle.button}>
                            <IonCardTitle className={ConfirmationStyle.button}>  {selectedCourse.calories} <IonIcon icon={flameOutline} /></IonCardTitle>
                        </IonCard></IonCol>
                        <IonCol><IonCard className={ConfirmationStyle.button}>
                            <IonCardTitle className={ConfirmationStyle.button}>  {selectedCourse.credits}  <IonIcon icon={cardOutline} /></IonCardTitle>
                        </IonCard></IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol>
                            <IonList className={ConfirmationStyle.menu_list}>
                                <IonItem className={ConfirmationStyle.itemHead} >
                                    <IonLabel>{selectedCourse.gym}</IonLabel>
                                </IonItem>
                                <IonItem className={ConfirmationStyle.itemHead} >
                                    <IonLabel className={ConfirmationStyle.text_left}>{selectedCourse.name} </IonLabel>
                                    <IonLabel className={ConfirmationStyle.text_left}><IonChip className={ConfirmationStyle[selectedCourse.level]}>{selectedCourse.level} Intensity</IonChip></IonLabel>
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
