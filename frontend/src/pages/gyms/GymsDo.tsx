import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewDidLeave, useIonViewWillEnter } from "@ionic/react"
import { useQuery } from "@tanstack/react-query"
import { getCoursesforGym } from "../../api/coursesApi"
import { useEffect, useState } from "react"
import { CourseListItem } from "../../components/gyms/CourseListItem"

export interface gymCourseData{
calories: number;
course_id: number;
course_type_id: number;
course_type_name: string;
credits: number;
default_quota: number;
default_trainer_id: number;
duration: number;
gym_id: number;
intensity_id: number;
intensity_level: string;
name: string;
trainer_icon: string;
trainer_name: string;
}

export function GymsDo() {

    const [courseData,setCourseData] = useState<gymCourseData[]>([])
    const courses = useQuery({
        queryKey:['coursesQuery'],
        queryFn:()=>getCoursesforGym()
    })
    useIonViewWillEnter(()=>{
        courses.refetch()
        setCourseData(courses.data)
    })
    useIonViewDidLeave(()=>{
        courses.remove()
        setCourseData([])
    })


    

    return (
        <IonPage >
            <IonHeader >
                <IonToolbar >
                    <IonTitle>Gyms' Do</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen class="ion-padding">
            <IonButton expand="block">Add courses</IonButton>
            {courseData? courseData.map((course,index)=><CourseListItem key={index} {...course}/>) : <></>}
            </IonContent>
        </IonPage >
)
}