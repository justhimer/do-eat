import { IonBackButton, IonButton, IonCard, IonCardSubtitle, IonCardTitle, IonChip, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonNavLink, IonPage, IonRow, IonTitle, IonToolbar, useIonToast, useIonViewDidEnter, useIonViewDidLeave, useIonViewWillEnter, useIonViewWillLeave } from "@ionic/react";
import ConfirmationStyle from '../../../scss/GymConfirm.module.scss'
import { cardOutline, flameOutline } from "ionicons/icons";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import format from "date-fns/format";
import { utcToZonedTime } from 'date-fns-tz'
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { courseJoin } from "../../../api/userScheduleAPI";
import { getUserInfo, getUserSubscribed } from "../../../api/userAPIs";
import NotificationStyle from "../../../scss/Notification.module.scss";
import { GymPopup } from "../GymPopup";
import { queryClient } from "../../..";
import { useHistory } from "react-router";
import { fetchCredits } from "../../../api/creditTransactionsAPI";


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
    const [loadedUser, setLoadedUser] = useState<any>(null)
    const [loadedSub, setLoadedSub] = useState<any>(null)

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
                presentToast('top','Error')
        }
    }




    const { data: joinData, refetch: joinRefetch} = useQuery({
        queryKey: ["joinQuery"],
        queryFn: () => courseJoin(selectedCourse.this_id),
        enabled: false,
        keepPreviousData: false
    })
    const { data: userData, refetch: userRefetch } = useQuery({
        queryKey: ["userQuery"],
        queryFn: () => getUserInfo(),
        enabled: false,
        keepPreviousData: false,
    })
    const { data: subData, refetch: subRefetch } = useQuery({
        queryKey: ["subQuery"],
        queryFn: () => getUserSubscribed(userData.id),
        enabled: false,
        keepPreviousData: false
    })
    const { data: creditData, refetch: creditRefetch} = useQuery({
        queryKey: ["creditQuery"],
        queryFn: () => fetchCredits(),
        enabled: false,
        keepPreviousData: false
    })

    useIonViewDidLeave(async () => {
        console.log('user left')
        setLoadedUser(null)
        setLoadedSub(null)
        setPopupBoolean(false)
    })

    useIonViewDidEnter(async () => {
        console.log('user entered')
        await userRefetch()
        if (userData) {
            setLoadedUser(userData)
            await subRefetch(userData.id)
            await creditRefetch()
            console.log('is subbed',userData)
            if (subData) {
                setLoadedSub(subData)
            }
        }
        return
    })


    const containerClick = async () => {
        if (loadedUser) {
            if (loadedSub) {
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

    const attemptJoinCourse = async()=>{
        await joinRefetch()
        if (joinData){
            notify('success')
            history.replace('/do-tab')
        }else{
            notify('error')
        }
    }


    return (
        <IonPage >
            {popupBoolean ? <GymPopup name={selectedCourse.name} gym={selectedCourse.gym} date={format(date, "E, dd MMM ")} time={format(date, "hh:mm aaa")} costs={selectedCourse.credits} credits={creditData} dismiss={() => setPopupBoolean(false)} join={attemptJoinCourse} subPlan={loadedUser.sub_plan_id}/> : <></>}
            <IonHeader >
                <IonToolbar >
                    <IonNavLink routerDirection="back" slot="start">
                        <IonBackButton></IonBackButton>
                    </IonNavLink>
                    <IonTitle>Do "It"</IonTitle>
                </IonToolbar>
            </IonHeader>
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
