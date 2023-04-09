import GymStyle from '../../scss/GymConfirm.module.scss'
import { IonBackButton, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonNavLink, IonPage, IonRow, IonTitle, IonToolbar, useIonToast } from "@ionic/react";
import { GymPopupInterface } from './superstructure/GymConfirmation';

export function GymPopup(props: GymPopupInterface) {
    console.log("credits: ",props.credits)
    return (
        <div id="popup-Container" className={GymStyle.popup}>
            <IonCard>
                <div onClick={props.dismiss}></div>
                <IonCardHeader>
                    <IonCardTitle>{props.name}</IonCardTitle>
                    <IonCardSubtitle>@ {props.gym}</IonCardSubtitle>
                </IonCardHeader>

                <IonGrid>
                    <IonRow>
                        <IonCol>Date</IonCol>
                        <IonCol>{props.date}</IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>Time</IonCol>
                        <IonCol>{props.time}</IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>Costs {props.subPlan==2? "(VIP)": null }</IonCol>
                        <IonCol>{props.subPlan==2? 0 : props.costs}</IonCol>
                    </IonRow>
                    {
                        props.subPlan==2?
                            <>
                            </>
                        :
                        <>
                        <IonRow>
                        <IonCol>Credits</IonCol>
                        <IonCol>{props.credits}</IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>Remainder</IonCol>
                        <IonCol>{props.credits - props.costs}</IonCol>
                    </IonRow>
                        </>

                    }
                    
                </IonGrid>

                <IonButton fill="clear" onClick={props.join}>Confirm Register</IonButton>
            </IonCard>
        </div>
    )

    // <div id="popup-Container" className={GymStyle.popup}>
    //     <div id="popup-Menu" className={GymStyle.menu} >
    //         <div className={GymStyle.menuBlock}>test</div>
    //         <div className={GymStyle.menuBlock}>test</div>
    //         <div className={GymStyle.menuBlock}>test</div>
    //         <div className={GymStyle.menuBottom}>test</div>
    //     </div>

    // </div>
}