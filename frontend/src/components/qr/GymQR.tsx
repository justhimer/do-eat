import { IonModal, IonHeader, IonToolbar, IonTitle, IonButton, IonContent, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonNote, IonRow } from '@ionic/react';
import { useRef, useState } from 'react';
import QrReader from "react-qr-reader";

export function GymQR() {

    const modal = useRef<HTMLIonModalElement>(null);

    const [QRData, setQRData] = useState(false);

    function handleScan(data: any) {
        if (data) {
            setQRData(data);
        }
    }

    function handleError(err: any) {
        console.log(err);
    }

    return (
        <IonModal ref={modal} trigger="open-qr">

            <IonHeader>
                <IonToolbar>
                    <IonTitle>QR Code</IonTitle>
                    <IonButton onClick={() => modal.current?.dismiss()}>Cancel</IonButton>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">

                <IonGrid className="ion-padding-top ion-margin-top">
                    <IonRow className="ion-justify-content-center ion-text-center animate__animated animate__lightSpeedInLeft animate__faster">
                        <IonCol size="12">

                            <QrReader
                                delay={500}
                                onError={handleError}
                                onScan={handleScan}
                                style={{ width: "100%", height: "100%" }}
                            />
                        </IonCol>
                    </IonRow>
                </IonGrid>

            </IonContent>

        </IonModal>
    )
}