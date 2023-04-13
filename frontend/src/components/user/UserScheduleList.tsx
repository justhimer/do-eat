import { IonBackButton, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonDatetime, IonHeader, IonList, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from "@ionic/react";
import AppStyle from '../../scss/App.module.scss'
import { fetchCourses } from "../../api/userScheduleAPI";
import { useQuery } from "@tanstack/react-query";
import { UserScheduleItem } from "./UserScheduleItem";
import { useEffect } from "react";

export function UserScheduleList() {

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

    useIonViewWillEnter(() => {
        refetch();
    }, [])

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
            </IonContent>
        </IonPage >
    )
}