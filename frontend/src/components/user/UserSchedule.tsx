import { IonBackButton, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonDatetime, IonHeader, IonList, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import AppStyle from '../../scss/App.module.scss'
import { fetchCourses } from "../../api/userScheduleAPI";
import { useQuery } from "@tanstack/react-query";
import { UserScheduleItem } from "./UserScheduleItem";

export function UserSchedule() {

    const { data: courses, isLoading, refetch, remove } = useQuery({
        queryKey: ["courses"],
        queryFn: async () => {
            const schedule = await fetchCourses();
            // sorting schedule according to time
            schedule.sort((a: any, b: any) => {
                const timeA = Date.parse(a.course_schedule.time);
                const timeB = Date.parse(b.course_schedule.time);
                return timeA - timeB;
            });
            return schedule;
        },
    });

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
                {
                    courses && courses.length > 0 && courses.map((course: any, index: number) => (
                        <UserScheduleItem
                            key={course.course_schedule.id}
                            courseName={course.course_schedule.courses.name}
                            time={course.course_schedule.time}
                            duration={course.course_schedule.courses.duration}
                            gymName={course.course_schedule.courses.gyms.name}
                            address={course.course_schedule.courses.gyms.address}
                            attendence={course.attendance_type.details}
                        />
                    ))
                }

                {/* <IonDatetime
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
                    ></IonDatetime> */}
            </IonContent>
        </IonPage >
    )
}