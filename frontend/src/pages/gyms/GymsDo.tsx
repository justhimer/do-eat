import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewDidLeave, useIonViewWillEnter } from "@ionic/react"
import { useQuery } from "@tanstack/react-query"
import { getCoursesforGym, gymCourseData } from "../../api/coursesApi"
import { CourseListItem } from "../../components/gyms/CourseListItem"
import { useHistory } from "react-router"




export function GymsDo() {


    const courses = useQuery({
        queryKey:['coursesQuery'],
        queryFn:()=>getCoursesforGym()
    })


    useIonViewWillEnter(()=>{
        courses.refetch()
    })
    useIonViewDidLeave(()=>{
        courses.remove()
    })
    const history = useHistory()
    
    const createCourse = ()=>{
        history.push('/create-course')
    }


    

    return (
        <IonPage >
            <IonHeader >
                <IonToolbar >
                    <IonTitle>Gyms' Do</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen class="ion-padding">
            <IonButton expand="block" onClick={createCourse}>Add courses</IonButton>
            {courses.data? courses.data.map((course: gymCourseData,index :number)=><CourseListItem key={index} {...course}/>) : <></>}
            </IonContent>
        </IonPage >
)
}