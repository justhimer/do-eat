import { IonContent, useIonViewWillEnter } from "@ionic/react";
import { DatePicker } from "../DatePicker/DatePicker";
import format from "date-fns/format";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useQuery } from "@tanstack/react-query";
import { getCoursesOnDate, getDatesWithCourses } from "../../api/coursesApi";
import { MarkedDatesInterface } from "../../pages/Do";


export function CoursesPick(){

//#region To Get Gyms selected by user
    const selectedGyms = useSelector((state: RootState) => state.userGym);
// to mutate values of selected gym from Array<{name,id}> to Array<id>
    function gymArray(){
        const newArray: number[]= []
        selectedGyms.forEach(elem=>{newArray.push(elem.id)})
        return newArray
    }
//#endregion

//#region Pull Dates with courses from server 
    const {data: dates} = useQuery({
        queryKey:["datesQuery"],
        queryFn: ()=>getDatesWithCourses(gymArray()),
    })
// to mutate pulled data from {date:string,marked,boolean} to {date:Date,marked:boolean}
    const marked = () => {
        if (dates){
            const newArray = dates.map((elem:any) => {return {date: new Date(elem.date),marked:true}})
            return newArray
        }
        return []
    }
//#endregion

//#region retrieve the selected date from Datepicker
const [singleDate, setSingleDate] = useState(format(new Date,"yyyy-MM-dd"))
const selectedDay = (val:any)=>{
        setSingleDate(format(val,"yyyy-MM-dd"))
    }
//#endregion

//#region retrieve data on the courses on the date
const [coursesOnDay, setCoursesOnDay] = useState<any[]>([])
const {data:fetchedCourses} = useQuery({
    queryKey: ["gettingCoursesOnDay",singleDate],
    queryFn: ()=>getCoursesOnDate(singleDate,gymArray())
})
useEffect(()=>{
setCoursesOnDay(fetchedCourses)
},[fetchedCourses])
console.log(coursesOnDay)

    return <IonContent>
        <DatePicker 
                getSelectedDay={selectedDay}
                startDate={new Date}
                numOfDays={14}
                selectDate={new Date}
                labelFormat={"MMMM"}
                color={"#374e8c"} 
                marked={marked()}
                />

    </IonContent>
}