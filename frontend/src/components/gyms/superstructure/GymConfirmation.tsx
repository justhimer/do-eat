import { IonBackButton, IonButton, IonCard, IonCardSubtitle, IonCardTitle, IonChip, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonNavLink, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react";
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

export function GymConfirmation() {

    const selectedCourse = useSelector((state:RootState)=>state.userCourse)
    console.log(selectedCourse)
    const [date,setDate] = useState<Date>(new Date())
    useEffect(()=>{
        setDate(utcToZonedTime(new Date(selectedCourse.time),"Asia/Hong_Kong"))
    },[selectedCourse])
    const {data : joinData,isSuccess:joinStatus,isLoading:joinIsLoading,refetch:joinRefetch, error:joinError} = useQuery({
        queryKey:["joinQuery"],
        queryFn:()=>courseJoin(selectedCourse.this_id),
        enabled: false
    })
    const {data : userData,status:userStatus,isLoading:userIsLoading,refetch:userRefetch} = useQuery({
        queryKey:["userQuery"],
        queryFn:()=>getUserInfo(),
        enabled: false
    })
    const {data : subData,status:subStatus,isLoading:subIsLoading,refetch:subRefetch} = useQuery({
        queryKey:["subQuery"],
        queryFn:()=>getUserSubscribed(userData.id),
        enabled: false
    })
    const test = ()=>{

        userRefetch()
        if(userData){
            console.log("userData", userData,userStatus)
            subRefetch()
            if (subData){
                console.log("subData",subData,subStatus)
                joinRefetch()
                if(joinStatus){
                    console.log("joinData",joinData)
                }
            }
        }
        
        // console.log("joinData", joinData,joinStatus)
        
        
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
                        
                        <IonCardTitle>  {selectedCourse.calorise} <IonIcon icon={flameOutline}/></IonCardTitle>
                    </IonCard></IonCol>
                    <IonCol><IonCard className={ConfirmationStyle.button}>
                        
                        <IonCardTitle>  {selectedCourse.credits} <IonIcon icon={cardOutline}/></IonCardTitle>
                    </IonCard></IonCol>
                </IonRow>

                <IonRow>
                    <IonCol>
                        <IonList className={ConfirmationStyle.menu_list}>
                            <IonItem className={ConfirmationStyle.itemHead} >
                                <IonLabel>{selectedCourse.name} <IonChip className={ConfirmationStyle[selectedCourse.level]}>{selectedCourse.level} Intensity</IonChip></IonLabel>
                            </IonItem>
                            <IonItem className={ConfirmationStyle.item} >
                                <IonLabel>{format(date,"E, dd MMM ")}</IonLabel>
                                <IonLabel>{format(date,"hh:mm aaa")}</IonLabel>
                            </IonItem>
                            <IonItem className={ConfirmationStyle.item} >
                                <IonLabel>Location</IonLabel>
                                <IonLabel>{selectedCourse.gym}</IonLabel>
                            </IonItem>
                            <IonItem className={ConfirmationStyle.item_last}>
                                <IonLabel>Slots remaining</IonLabel>
                                <IonLabel>{selectedCourse.quota - selectedCourse.filled}</IonLabel>
                            </IonItem>
                        </IonList>
                    </IonCol>
                </IonRow>

                <IonRow>
                    <IonCol><IonButton className={ConfirmationStyle.bigButton} onClick={test}>Register Now</IonButton></IonCol>
                </IonRow>
            </IonGrid>
            </IonContent>
        </IonPage > 
    )
}