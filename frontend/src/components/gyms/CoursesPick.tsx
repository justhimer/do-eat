import { IonCard, IonCardContent, IonContent, IonList } from "@ionic/react";
import { CoursesItem } from "./CoursesItem";
import courseStyle from '../../scss/GymCourses.module.scss'
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCoursesOnDate } from "../../api/coursesApi";
import { CoursesItemInterface, CoursesPickInterface } from "../../pages/Do";

export function CoursesPick(props: CoursesPickInterface) {
    //#region To Get Gyms selected by user
    const selectedGyms = useSelector((state: RootState) => state.userGym);
    // to mutate values of selected gym from Array<{name,id}> to Array<id>
    function gymArray() {
        const newArray: number[] = []
        selectedGyms.forEach(elem => { newArray.push(elem.id) })
        return newArray
    }
    //#endregion

    //#region retrieve data on the courses on the date
    const [coursesOnDay, setCoursesOnDay] = useState<any[]>([])
    const {data: fetchedCourses} = useQuery({
        queryKey: ["gettingCoursesOnDay", props.selectedDay],
        queryFn: () => getCoursesOnDate(props.selectedDay, gymArray())
    })
    useEffect(() => {
        if (fetchedCourses){
            setCoursesOnDay(fetchedCourses)
            console.log("coursesOnDay: ",coursesOnDay)
        }
    }, [fetchedCourses])
   
    //#endregion

    return <>
        <IonContent className={courseStyle.courseContainer}>
            {
                // true ? fetchedCourses.data.map((course:CoursesItemInterface, index:number)=><CoursesItem key={index} {...course}/>) : <div>"No Courses Today"</div>
            }
            {/* <CoursesItem /> */}
        </IonContent>
    </>
}