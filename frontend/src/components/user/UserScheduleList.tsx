import UserStyle from '../../scss/User.module.scss';

import { IonBackButton, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonDatetime, IonHeader, IonLabel, IonList, IonPage, IonRefresher, IonRefresherContent, IonSegment, IonSegmentButton, IonTitle, IonToolbar, RefresherEventDetail, useIonViewWillEnter } from "@ionic/react";
import { fetchCoursesAttendedOrAbsent, fetchCoursesPending } from "../../api/userScheduleAPI";
import { useQuery } from "@tanstack/react-query";
import { UserScheduleItem } from "./UserScheduleItem";
import { useState } from 'react';
import { NoResult } from '../NoResult';

export function UserScheduleList() {

    const defaultCheckWhat = "coming";
    const [checkWhat, setCheckWhat] = useState<string>(defaultCheckWhat);

    const { data: coursesPending, refetch: refetchPending } = useQuery({
        queryKey: ["courses_pending"],
        queryFn: async () => {
            const coursesPending = await fetchCoursesPending();
            console.log(coursesPending);
            // sorting schedule according to time
            coursesPending.sort((a: any, b: any) => {
                const timeA = Date.parse(a.course_schedule.time);
                const timeB = Date.parse(b.course_schedule.time);
                return timeA - timeB;
            });
            return coursesPending;
        },
    });

    const { data: coursesAttendedOrAbsent, refetch: refetchcoursesAttendedOrAbsent } = useQuery({
        queryKey: ["courses_attended_or_absent"],
        queryFn: async () => {
            const coursesAttendedOrAbsent = await fetchCoursesAttendedOrAbsent();
            // sorting schedule according to time
            coursesAttendedOrAbsent.sort((a: any, b: any) => {
                const timeA = Date.parse(a.course_schedule.time);
                const timeB = Date.parse(b.course_schedule.time);
                return timeA - timeB;
            });
            return coursesAttendedOrAbsent;
        },
    });

    function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
        if (checkWhat === "coming") {
            refetchPending().then(() => {
                event.detail.complete();
            })
        } else {
            refetchcoursesAttendedOrAbsent().then(() => {
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
                    checkWhat === 'coming' && coursesPending && coursesPending.length > 0 && coursesPending.map((course: any, index: number) => (
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
                    ))
                }

                {
                    checkWhat === 'history' && coursesAttendedOrAbsent && coursesAttendedOrAbsent.length > 0 && coursesAttendedOrAbsent.map((course: any, index: number) => (
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
                    ))
                }

                {checkWhat === 'coming' && (coursesPending && coursesPending.length === 0) && <NoResult />}
                {checkWhat === 'history' && (coursesAttendedOrAbsent && coursesAttendedOrAbsent.length === 0) && <NoResult />}

            </IonContent>
        </IonPage >
    )
}