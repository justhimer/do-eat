import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewDidLeave, useIonViewWillEnter } from "@ionic/react"
import { useQuery } from "@tanstack/react-query"
import { getCoursesforGym, gymCourseData } from "../../api/coursesApi"
import { CourseListItem } from "../../components/gyms/CourseListItem"
import { useHistory } from "react-router"
import GymCourseStyle from '../../scss/GymCourses.module.scss'



export function GymsDo() {

    const history = useHistory()
    const noCourse = (
        <div className={GymCourseStyle.noCourse}>
            <h6 className="title">No Courses Available</h6>
            <img src={`./assets/no_course/Yoga.png`} />
            <h5>Let's start by creating a new Course!</h5>
        </div>
    )

    const createCourse = () => {
        history.push('/create-course')
    }

    const courses = useQuery({
        queryKey: ['coursesQuery'],
        queryFn: () => getCoursesforGym()
    })

    useIonViewWillEnter(() => {
        courses.refetch()
    })
    useIonViewDidLeave(() => {
    })

    return (
        <IonPage >
            <IonHeader >
                <IonToolbar >
                    <IonTitle>Gyms' Do</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className={GymCourseStyle.coursePick + " ion-padding"}>
                <IonButton expand="block" onClick={createCourse} className={GymCourseStyle.gymDoButton}>Add courses</IonButton>
                {courses.data && courses.data.length > 0 ? courses.data.map((course: gymCourseData, index: number) => <CourseListItem key={index} {...course} />) : <></>}
                {courses.data && courses.data.length === 0 && noCourse}
            </IonContent>
        </IonPage >
    )
}