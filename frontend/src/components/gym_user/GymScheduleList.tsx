import { useIonViewWillEnter, IonPage, IonHeader, IonToolbar, IonButton, IonBackButton, IonTitle, IonContent, IonRefresher, IonRefresherContent, RefresherEventDetail } from "@ionic/react";
import { useQuery } from "@tanstack/react-query";
import { fetchCoursesInNext24Hours } from "../../api/coursesSchedulesAPI";
import { GymScheduleItem } from "./GymScheduleItem";
import { fetchCourseRemainingSlots } from "../../api/userScheduleAPI";
import { NoResult } from "../NoResult";


export function GymScheduleList() {

    const { data: courses, isLoading, refetch, remove } = useQuery({
        queryKey: ["gym-schedule"],
        queryFn: async () => {
            const courses = await fetchCoursesInNext24Hours();
            // console.log('courses: ', courses);

            // sorting schedule according to time
            courses.sort((a: any, b: any) => {
                const timeA = Date.parse(a.time);
                const timeB = Date.parse(b.time);
                return timeA - timeB;
            });
            return courses;
        },
    });

    useIonViewWillEnter(() => {
        refetch();
    }, [])

    function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
        refetch().then(() => {
            event.detail.complete();
        })
    }

    return (
        <IonPage >
            <IonHeader >
                <IonToolbar >
                    <IonButton slot="start">
                        <IonBackButton default-href="/"></IonBackButton>
                    </IonButton>
                    <IonTitle>Coming Courses</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
                {
                    courses && courses.length > 0 && courses.map((course: any) => (
                        <GymScheduleItem
                            key={course.id}
                            courseScheduleID={course.id}
                            courseName={course.courses.name}
                            time={course.time}
                            duration={course.courses.duration}
                            trainerName={course.trainers.name}
                            quota={course.quota}
                            filledSlot={course.slot}
                            courseType={course.courses.course_type.name}
                        // intensityID={course.courses.intensity.id}
                        // intensityLevel={course.courses.intensity.level}
                        />
                    ))
                }
                {courses && courses.length === 0 && <NoResult />}
            </IonContent>
        </IonPage >
    )
}