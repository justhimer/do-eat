import { IonContent} from "@ionic/react";
import { CoursesItem} from "./CoursesItem";
import courseStyle from '../../scss/GymCourses.module.scss'
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {  useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCoursesOnDate } from "../../api/coursesApi";
import { CoursesInterface } from "../../redux/userCourseSlice";




export function CoursesPick(){    
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

    const singleDate = useSelector((state:RootState)=>state.userDate.date)
    const [coursesOnDay, setCoursesOnDay] = useState<any[]>([])
    
    const fetchedCourses = useQuery({
        queryKey: ["gettingCoursesOnDay", singleDate],
        queryFn: () => getCoursesOnDate(singleDate, gymArray())
    })
    useEffect(() => {
        setCoursesOnDay(fetchedCourses.data)
    },[fetchedCourses.data])
   
    //#endregion

    return <>
        <IonContent className={courseStyle.courseContainer}>
            {
                coursesOnDay && coursesOnDay.length>0 ? coursesOnDay.map((course:CoursesInterface, index:number)=><CoursesItem key={index} {...course}/>) : <div>"No Courses Today"</div>
            }
            {/* <CoursesItem /> */}
        </IonContent>
    </>
}