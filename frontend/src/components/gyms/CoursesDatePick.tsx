import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useQuery } from "@tanstack/react-query";
import { getDatesWithCourses } from "../../api/coursesApi";
import { addDays } from "date-fns";
import dateStyles from "../DatePicker/DatePicker.module.scss"
import { DateView } from "../DatePicker/Dateview";


export function CoursesDatePick() {
    const color = 'rgb(54, 105, 238)';
    const startDate = new Date;
    const numOfDays = 50
    const labelFormat="MMMM"


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
    const { data: dates } = useQuery({
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

    const next = (event:any) => {
        event.preventDefault();
        const e = document.getElementById('datePickContainer');
        if (e){
            const width = e.getBoundingClientRect().width;
            e!.scrollLeft += width - 60;
        }

    };

    const prev = (event:any) => {
        event.preventDefault();
        const e = document.getElementById('datePickContainer');
        if (e){
            const width = e.getBoundingClientRect().width
            e!.scrollLeft -= width - 60;
        }
    };

    const primaryColor = color
    const lastDate = addDays(startDate, numOfDays || 90);

    let buttonzIndex = { zIndex: 2 };
    let buttonStyle = { background: primaryColor };

    return <>
        <div className={dateStyles.Container}>
            <DateView primaryColor={primaryColor} startDate={startDate} lastDate={lastDate} selectDate={startDate} marked={marked()} labelFormat={labelFormat}/>
        </div>
        <div className={dateStyles.buttonWrapper} style={buttonzIndex}>
            <button className={dateStyles.button} style={buttonStyle} onClick={prev}>&lt;</button>
        </div>
        <div className={dateStyles.buttonWrapper} style={buttonzIndex}>
            <button className={dateStyles.button} style={buttonStyle} onClick={next}>&gt;</button>
        </div>

    </>
}