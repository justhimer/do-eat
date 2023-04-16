import { IonModal, IonHeader, IonToolbar, IonTitle, IonButton, IonContent } from '@ionic/react';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import AppStyle from '../../scss/App.module.scss';

import QRCode from 'react-qr-code';
// import { BarcodeScanner } from "@ionic-native/barcode-scanner";

export function UserQR() {

    const modal = useRef<HTMLIonModalElement>(null);
    const userID = useSelector((state: RootState) => state.user.id);

    // const [ QRData, setQRData ] = useState(false);

    // const start = async () => {
    //   const data = await BarcodeScanner.scan();
    //   setQRData(data);
    // }

    return (
        // <IonModal ref={modal} trigger="open-qr">
        //     <IonHeader>
        //         <IonToolbar>
        //             <IonTitle>QR Code</IonTitle>
        //             <IonButton onClick={() => modal.current?.dismiss()}>Cancel</IonButton>
        //         </IonToolbar>
        //     </IonHeader>
        //     <IonContent className="ion-padding">
        //         <div className={AppStyle.qr_container}>
        //             <QRCode value={`${userID}`} />
        //         </div>
        //     </IonContent>
        // </IonModal>
    )
}