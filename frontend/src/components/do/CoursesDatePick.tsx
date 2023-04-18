import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useQuery } from "@tanstack/react-query";
import { addDays } from "date-fns";
import dateStyles from "../DatePicker/DatePicker.module.scss"
import { DateView } from "../DatePicker/Dateview";
import { getDatesWithCourses } from "../../api/coursesSchedulesAPI";
import { useIonViewWillEnter } from "@ionic/react";


export function CoursesDatePick() {
    const primaryColor = 'rgb(97,92,89)';
    const startDate = new Date;
    const numOfDays = 14
    const labelFormat = "MMMM"


    //#region To Get Gyms selected by user
    const selectedGyms = useSelector((state: RootState) => state.userGym);
    // to mutate values of selected gym from Array<{name,id}> to Array<id>
    function gymArray() {
        const newArray: number[] = []
        selectedGyms.forEach(elem => { newArray.push(elem.id) })
        return newArray
    }
    //#endregion

    //#region Pull Dates with courses from server 
    const { data: dates, refetch:datesRefetch } = useQuery({
        queryKey: ["datesQuery"],
        queryFn: () => getDatesWithCourses(gymArray()),
    })
    // to mutate pulled data from {date:string,marked,boolean} to {date:Date,marked:boolean}
    const marked = () => {
        if (dates) {
            const newArray = dates.map((elem: any) => { return { date: new Date(elem.date), marked: true } })
            return newArray
        }
        return []
    }
    //#endregion

    useIonViewWillEnter(()=>{
        datesRefetch()
    })

    const next = (event: any) => {
        event.preventDefault();
        const e = document.getElementById('datePickContainer');
        if (e) {
            const width = e.getBoundingClientRect().width;
            e!.scrollLeft += width - 60;
        }

    };

    const prev = (event: any) => {
        event.preventDefault();
        const e = document.getElementById('datePickContainer');
        if (e) {
            const width = e.getBoundingClientRect().width
            e!.scrollLeft -= width - 60;
        }
    };


    const lastDate = addDays(startDate, numOfDays);

    let buttonzIndex = { zIndex: 2 };
    let buttonStyle = { background: '#e74c3c' };

    return <div className={dateStyles.Container}>
        <div className={dateStyles.dates}>
        <DateView primaryColor={primaryColor} startDate={startDate} lastDate={lastDate} selectDate={startDate} marked={marked()} labelFormat={labelFormat} />
        </div>
        <div className={dateStyles.buttonWrapper}>
                <button className={dateStyles.button} style={buttonStyle} onClick={prev}>&lt;</button>
                <button className={dateStyles.button} style={buttonStyle} onClick={next}>&gt;</button>
        </div>


    </div>
}