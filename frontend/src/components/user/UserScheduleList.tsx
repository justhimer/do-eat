import UserStyle from '../../scss/User.module.scss';

import { IonBackButton, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonDatetime, IonHeader, IonLabel, IonList, IonPage, IonRefresher, IonRefresherContent, IonSegment, IonSegmentButton, IonTitle, IonToolbar, RefresherEventDetail, useIonViewWillEnter } from "@ionic/react";
import { fetchCoursesHistory, fetchCoursesComing } from "../../api/userScheduleAPI";
import { useQuery } from "@tanstack/react-query";
import { UserScheduleItem } from "./UserScheduleItem";
import { useState } from 'react';
import { NoResult } from '../NoResult';

export function UserScheduleList() {

    const defaultCheckWhat = "coming";
    const [checkWhat, setCheckWhat] = useState<string>(defaultCheckWhat);

    const { data: coursesComing, refetch: refetchComing } = useQuery({
        queryKey: ["courses_coming"],
        queryFn: async () => {
            const coursesComing = await fetchCoursesComing();
            console.log(coursesComing);
            // sorting schedule according to time
            coursesComing.sort((a: any, b: any) => {
                const timeA = Date.parse(a.course_schedule.time);
                const timeB = Date.parse(b.course_schedule.time);
                return timeA - timeB;
            });
            return coursesComing;
        },
    });

    const { data: coursesHistory, refetch: refetchHistory } = useQuery({
        queryKey: ["courses_history"],
        queryFn: async () => {
            const coursesHistory = await fetchCoursesHistory();
            // sorting schedule according to time
            coursesHistory.sort((a: any, b: any) => {
                const timeA = Date.parse(a.course_schedule.time);
                const timeB = Date.parse(b.course_schedule.time);
                return timeA - timeB;
            });
            return coursesHistory;
        },
    });

    function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
        if (checkWhat === "coming") {
            refetchComing().then(() => {
                event.detail.complete();
            })
        } else {
            refetchHistory().then(() => {
                event.detail.complete();
            })
        }
    }

    // useIonViewWillEnter(() => {
    //     refetchPending()
    //     refetchcoursesAttendedOrAbsent()
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
                    checkWhat === 'coming' && coursesComing && coursesComing.length > 0 && coursesComing.map((course: any, index: number) => (
                        <UserScheduleItem
                            key={course.course_schedule.id}
                            userScheduleID={course.id}
                            courseScheduleID={course.course_schedule.id}
                            courseName={course.course_schedule.courses.name}
                            courseType={course.course_schedule.courses.course_type.name}
                            time={course.course_schedule.time}
                            duration={course.course_schedule.courses.duration}
                            gymName={course.course_schedule.courses.gyms.name}
                            address={course.course_schedule.courses.gyms.address}
                            attendence={course.attendance_type.details}
                            toRefetch={refetchComing}
                        />
                    ))
                }

                {
                    checkWhat === 'history' && coursesHistory && coursesHistory.length > 0 && coursesHistory.map((course: any, index: number) => (
                        <UserScheduleItem
                            key={course.course_schedule.id}
                            userScheduleID={course.id}
                            courseScheduleID={course.course_schedule.id}
                            courseName={course.course_schedule.courses.name}
                            courseType={course.course_schedule.courses.course_type.name}
                            time={course.course_schedule.time}
                            duration={course.course_schedule.courses.duration}
                            gymName={course.course_schedule.courses.gyms.name}
                            address={course.course_schedule.courses.gyms.address}
                            attendence={course.attendance_type.details}
                            toRefetch={() => { }}
                        />
                    ))
                }

                {checkWhat === 'coming' && (coursesComing && coursesComing.length === 0) && <NoResult />}
                {checkWhat === 'history' && (coursesHistory && coursesHistory.length === 0) && <NoResult />}

            </IonContent>
        </IonPage >
    )
}