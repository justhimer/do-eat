import NotificationStyle from "../../scss/Notification.module.scss";
import UserStyle from '../../scss/User.module.scss';
import UserMenuStyle from "../../scss/UserMenu.module.scss";

import { IonModal, IonHeader, IonToolbar, IonTitle, IonButton, IonContent, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonNote, IonRow, useIonToast, IonLabel, IonSegment, IonSegmentButton, IonChip, IonItem, IonPage } from '@ionic/react';
import { useEffect, useRef, useState } from 'react';
import QrReader from "react-qr-reader";
import { fetchComingCourse } from "../../api/coursesSchedulesAPI";
import { useMutation, useQuery } from "@tanstack/react-query";
import { gymTakeAttendance } from "../../api/userScheduleAPI";
import { gymFoodTaken } from "../../api/foodHistoryAPIs";

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
        console.log('QRData: ', QRData);
        if (scanFor === 'course' && QRData) {
            takeAttendance.mutate(QRData);
            setQRData("");
        }
        if (scanFor === 'food' && QRData) {
            takeFood.mutate(QRData);
            setQRData("");
        }
    }, [QRData]);

    const takeFood = useMutation(
        (QRData: string) => gymFoodTaken({
            user_id: parseInt(QRData)
        }),
        {
            onSuccess: () => {
                present({
                    message: 'Food taken',
                    duration: 1500,
                    position: "top",
                    cssClass: NotificationStyle.ionicToast,
                });
            },
            onError: () => {
                present({
                    message: 'No food taken',
                    duration: 1500,
                    position: "top",
                    cssClass: NotificationStyle.ionicToast,
                });
            },
        }, 
    )

    const takeAttendance = useMutation(
        (QRData: string) => gymTakeAttendance({
            course_schedule_id: course.id,
            user_id: parseInt(QRData)
        }),
        {
            onSuccess: () => {
                present({
                    message: 'Attendance taken',
                    duration: 1500,
                    position: "top",
                    cssClass: NotificationStyle.ionicToast,
                });
            },
            onError: () => {
                present({
                    message: 'No attendance taken',
                    duration: 1500,
                    position: "top",
                    cssClass: NotificationStyle.ionicToast,
                });
            },
        }
    )

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>QR Code</IonTitle>
                    {/* <IonBackButton default-href="/"></IonBackButton> */}
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
                                style={{ width: "100%", height: "100%", transform: "scaleX(-1)" }}
                            />
                        </IonCol>
                    </IonRow>
                </IonGrid>

            </IonContent>
        </IonPage>
    )
}