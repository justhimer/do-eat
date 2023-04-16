import NotificationStyle from "../../scss/Notification.module.scss";
import UserStyle from '../../scss/User.module.scss';
import UserMenuStyle from "../../scss/UserMenu.module.scss";

import { IonModal, IonHeader, IonToolbar, IonTitle, IonButton, IonContent, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonNote, IonRow, useIonToast, IonLabel, IonSegment, IonSegmentButton, IonChip, IonItem } from '@ionic/react';
import { useEffect, useRef, useState } from 'react';
import QrReader from "react-qr-reader";
import { fetchComingCourse, gymTakeAttendance } from "../../api/coursesSchedulesAPI";
import { useMutation, useQuery } from "@tanstack/react-query";

export function GymQR() {

    const modal = useRef<HTMLIonModalElement>(null);
    const [QRData, setQRData] = useState<string>("");
    const [present] = useIonToast();

    const defaultScanFor = "food";
    const [scanFor, setScanFor] = useState<string>(defaultScanFor);

    const { data: course, isLoading, refetch, remove } = useQuery({
        queryKey: ["coming_class"],
        queryFn: fetchComingCourse,
    });

    function handleScan(data: any) {
        if (data) {
            setQRData(data);
        }
    }

    function handleError() {
        present({
            message: 'Error',
            duration: 1500,
            position: "top",
            cssClass: NotificationStyle.ionicToast,
        });
    }

    useEffect(() => {
        console.log(QRData);
        if (scanFor === 'food') {
            takeAttendance.mutate(QRData)
        }
    }, [QRData])

    const takeAttendance = useMutation(
        (QRData:string) => gymTakeAttendance(parseInt(QRData)),
        {
            onSuccess: ()=>{
                present({
                    message: 'Food has been taken',
                    duration: 1500,
                    position: "top",
                    cssClass: NotificationStyle.ionicToast,
                });
            }
        }
    )

    return (
        <IonModal ref={modal} trigger="open-qr">

            <IonHeader>
                <IonToolbar>
                    <IonTitle>QR Code</IonTitle>
                    <IonButton onClick={() => modal.current?.dismiss()}>Cancel</IonButton>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">

                <IonSegment
                    value={scanFor}
                    className={UserStyle.segment}
                    onIonChange={(e) => { setScanFor(e.detail.value!); }}
                >
                    <IonSegmentButton value="food">
                        <IonLabel>Food</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="course">
                        <IonLabel>Course</IonLabel>
                    </IonSegmentButton>
                </IonSegment>


                <IonItem className={UserMenuStyle.item_last}>
                    {scanFor === 'food' && (
                        <>
                            <IonLabel>
                                Scan for:
                            </IonLabel>
                            <p>Food Order</p>
                        </>
                    )}
                    {scanFor === 'course' && !!course && (
                        <>
                            <IonLabel>
                                Scan for:
                            </IonLabel>
                            <p>Class #{course.id} ({course.courses.name})</p>
                        </>
                    )}
                    {scanFor === 'course' && !course && (
                        <>
                            <IonLabel>
                                Scan for:
                            </IonLabel>
                            <p>No Coming Class for Scanning</p>
                        </>
                    )}
                </IonItem>

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