import { IonBackButton, IonButton, IonCard, IonCardTitle, IonChip, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonNavLink, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import ConfirmationStyle from '../../../scss/GymConfirm.module.scss'
import { cardOutline, flameOutline } from "ionicons/icons";
import { format } from "date-fns";

export function CourseDetails() {
    const selectedCourse = useSelector((state: RootState) => state.gymCourse)
    console.log(selectedCourse)
    return (
        <IonPage >
            <IonHeader >
                <IonToolbar >
                    <IonNavLink routerDirection="back" slot="start">
                        <IonBackButton></IonBackButton>
                    </IonNavLink>
                    <IonTitle>Gyms' "What"</IonTitle>
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

                            <IonCardTitle>  {selectedCourse.calories} <IonIcon icon={flameOutline} /></IonCardTitle>
                        </IonCard></IonCol>
                        <IonCol><IonCard className={ConfirmationStyle.button}>

                            <IonCardTitle>  {selectedCourse.credits} <IonIcon icon={cardOutline} /></IonCardTitle>
                        </IonCard></IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol>
                            <IonList className={ConfirmationStyle.menu_list}>
                                <IonItem className={ConfirmationStyle.itemHead} >
                                    <IonLabel>test</IonLabel>
                                </IonItem>
                                <IonItem className={ConfirmationStyle.itemHead} >
                                    <IonLabel>{selectedCourse.name} <IonChip className={ConfirmationStyle[selectedCourse.intensity_level]}>{selectedCourse.intensity_level} Intensity</IonChip></IonLabel>
                                </IonItem>
                                <IonItem className={ConfirmationStyle.item} >
                                    <IonLabel>{format(new Date(), "E, dd MMM ")}</IonLabel>
                                    <IonLabel>{format(new Date(), "hh:mm aaa")}</IonLabel>
                                </IonItem>
                                <IonItem className={ConfirmationStyle.item_last}>
                                    <IonLabel>{selectedCourse.default_quota}</IonLabel>
                                </IonItem>
                            </IonList>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol><IonButton className={ConfirmationStyle.bigButton} >Register Now</IonButton></IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage >
    )
}