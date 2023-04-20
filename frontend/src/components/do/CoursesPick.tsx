// Ionic Component
import { IonContent, useIonViewWillLeave} from "@ionic/react";

// Custom Component
import { CoursesItem} from "./CoursesItem";

// State Management
import { useQuery } from "@tanstack/react-query";
import {  useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { CoursesInterface } from "../../redux/userCourseSlice";


// API Routing
import { getCoursesOnDate } from "../../api/coursesSchedulesAPI";

// CSS
import GymCourseStyle from '../../scss/GymCourses.module.scss'



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
        queryFn: () => getCoursesOnDate(singleDate, gymArray()),
        keepPreviousData: false
        
    })
    useEffect(() => {
        setCoursesOnDay(fetchedCourses.data)
    },[fetchedCourses.data])
   
    useIonViewWillLeave(()=>{
        fetchedCourses.remove()
    })
    //#endregion

    const noCourse = (
        <div  className={GymCourseStyle.noCourse}>
            <h6 className="title">No Courses Today</h6>
            <img src={`./assets/no_course/Yoga.png`}/>
            <h5>Please select other dates or other gym combinations</h5>
        </div>
    )

    return <>
        <IonContent className={GymCourseStyle.coursePick}>
            {
                !fetchedCourses.isLoading && coursesOnDay && coursesOnDay.length>0 && coursesOnDay.map((course:CoursesInterface, index:number)=><CoursesItem key={index} {...course}/>) 
            }
            {
                !fetchedCourses.isLoading && fetchedCourses.data.length === 0 && noCourse
            }
        </IonContent>
    </>
}