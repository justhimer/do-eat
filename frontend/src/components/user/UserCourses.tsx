import { IonBackButton, IonButton, IonContent, IonDatetime, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import UserCoursesStyle from "../../scss/UserCourses.module.scss";
import AppStyle from '../../scss/App.module.scss'

export function UserCourses() {

    return (
        <IonPage >
            <IonHeader >
                <IonToolbar >
                    <IonButton slot="start">
                        <IonBackButton default-href="/"></IonBackButton>
                    </IonButton>
                    <IonTitle>Booked Courses</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <div className={AppStyle.center}>
                    <IonDatetime
                        presentation="date"
                        value="2023-01-01"
                        highlightedDates={[
                            {
                                date: '2023-01-05',
                                textColor: '#800080',
                                backgroundColor: '#ffc0cb',
                            },
                            {
                                date: '2023-01-10',
                                textColor: '#09721b',
                                backgroundColor: '#c8e5d0',
                            },
                            {
                                date: '2023-01-20',
                                textColor: 'var(--ion-color-secondary-contrast)',
                                backgroundColor: 'var(--ion-color-secondary)',
                            },
                            {
                                date: '2023-01-23',
                                textColor: 'rgb(68, 10, 184)',
                                backgroundColor: 'rgb(211, 200, 229)'
                            }
                        ]}
                    ></IonDatetime>
                </div>
            </IonContent>
        </IonPage >
    )
}