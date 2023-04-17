import UserStyle from '../../scss/User.module.scss';

import { IonBackButton, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonDatetime, IonHeader, IonLabel, IonList, IonPage, IonRefresher, IonRefresherContent, IonSegment, IonSegmentButton, IonTitle, IonToolbar, RefresherEventDetail, useIonViewWillEnter } from "@ionic/react";
import { fetchCourses } from "../../api/userScheduleAPI";
import { useQuery } from "@tanstack/react-query";
import { UserScheduleItem } from "./UserScheduleItem";
import { useState } from 'react';

export function UserScheduleList() {

    const defaultCheckWhat = "coming";
    const [checkWhat, setCheckWhat] = useState<string>(defaultCheckWhat);

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

    function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
        refetch().then(() => {
            event.detail.complete();
        })
        // setTimeout(() => {
        //   // Any calls to load data go here
        //   event.detail.complete();
        // }, 2000);
    }

    // useIonViewWillEnter(() => {
    //     refetch();
    // }, [])

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

                <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>

                <IonSegment
                    value={checkWhat}
                    className={UserStyle.segment}
                    onIonChange={(e) => { setCheckWhat(e.detail.value!); }}
                >
                    <IonSegmentButton value="coming">
                        <IonLabel>Coming</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="history">
                        <IonLabel>History</IonLabel>
                    </IonSegmentButton>
                </IonSegment>

                {
                    checkWhat === 'coming' && courses && courses.length > 0 && courses.map((course: any, index: number) => {
                        if (course.attendance_type.id === 1) {
                            return (
                                <UserScheduleItem
                                    key={course.course_schedule.id}
                                    classID={course.course_schedule.id}
                                    courseName={course.course_schedule.courses.name}
                                    courseType={course.course_schedule.courses.course_type.name}
                                    time={course.course_schedule.time}
                                    duration={course.course_schedule.courses.duration}
                                    gymName={course.course_schedule.courses.gyms.name}
                                    address={course.course_schedule.courses.gyms.address}
                                    attendence={course.attendance_type.details}
                                />
                            )
                        }

                    })
                }

                {
                    checkWhat === 'history' && courses && courses.length > 0 && courses.map((course: any, index: number) => {
                        if (course.attendance_type.id !== 1) {
                            return (
                                <UserScheduleItem
                                    key={course.course_schedule.id}
                                    classID={course.course_schedule.id}
                                    courseName={course.course_schedule.courses.name}
                                    courseType={course.course_schedule.courses.course_type.name}
                                    time={course.course_schedule.time}
                                    duration={course.course_schedule.courses.duration}
                                    gymName={course.course_schedule.courses.gyms.name}
                                    address={course.course_schedule.courses.gyms.address}
                                    attendence={course.attendance_type.details}
                                />
                            )
                        }
                    })
                }

            </IonContent>
        </IonPage >
    )
}