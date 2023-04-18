/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from "react";
import dateStyles from "./DatePicker.module.scss"
import {
    addDays,
    addMonths,
    differenceInMonths,
    format,
    getMonth,
    isSameDay,
    lastDayOfMonth,
    startOfMonth
} from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import userDateSlice, { replaceDateSelection } from "../../redux/userDateSlice";


const DateView = ({startDate, lastDate, selectDate, primaryColor, labelFormat, marked}) => {
    const singleDate = useSelector((state) => state.userDate.date)
    const dispatch = useDispatch()
    const [selectedDate, setSelectedDate] = useState(new Date(singleDate));
    const firstSection = {marginLeft: '40px'};
    const selectedStyle = {'font-weight':'bold', width:"50px",height:"50px",borderRadius:"50%",border:`3px solid #e5ddd1`,'background-color':'#e5ddd1' ,transform: `translateY(-10px)`};
    const labelColor = {color: primaryColor};
    const markedStyle = {color: "#8c3737", padding: "2px", fontSize: 12};

    const getStyles = (day) => {
        return isSameDay(day, selectedDate)?selectedStyle:null;
    };

    const getId = (day) => {
        return isSameDay(day, selectedDate)?'selected':"";
    };

    const getMarked = (day) => {
        let markedRes = marked?.find(i => isSameDay(i.date, day));
        if (markedRes) {
            if (!markedRes?.marked) {
                return;
            }

            return <div style={{ ...markedRes?.style ?? markedStyle }} className={dateStyles.markedLabel}>
                {markedRes.text}
            </div>;
        }

        return "";
    };

    const renderDays = () => {
        const dayFormat = "E";
        const dateFormat = "d";

        const months = [];
        let days = [];
        const monthdif = getMonth(lastDate) - getMonth(startDate)

        for (let i = 0; i <= monthdif; i++) {
            let start, end;
            const month = startOfMonth(addMonths(startDate, i));

            start = i === 0 ? Number(format(startDate, dateFormat)) - 1 : 0;
            end = i === monthdif ? Number(format(lastDate, "d")) : Number(format(lastDayOfMonth(month), "d"));
            console.log(`Start ${start} End ${end}`)
            for (let j = start; j < end; j++) {
                console.log("running dates")
                let currentDay = addDays(month, j);
                
                days.push(
                    <div id={`${getId(currentDay)}`}
                         className={marked.length > 0? marked.some(e=>isSameDay(e.date,currentDay)) ? dateStyles.dateDayItemMarked : dateStyles.dateDayItem : dateStyles.dateDayItem}
                         style={getStyles(currentDay)}
                         key={currentDay}
                         onClick={() => onDateClick(currentDay)}
                    >
                        <div className={dateStyles.dayLabel}>{format(currentDay, dayFormat)}</div>
                        <div className={dateStyles.dateLabel}>{format(currentDay, dateFormat)}</div>
                        {getMarked(currentDay)}
                    </div>
                );
            }
            months.push(
                <div className={dateStyles.monthContainer}
                     key={month}
                >
                    <span className={dateStyles.monthYearLabel} style={labelColor}>
                        {format(month, labelFormat || "MMMM yyyy")}
                    </span>
                    <div className={dateStyles.daysContainer} style={i===0?firstSection:null}>
                        {days}
                    </div>
                </div>
            );
            days = [];

        }

        return <div id={"datePickContainer"} className={dateStyles.dateListScrollable}>{months}</div>;
    }

    const onDateClick = day => {
        setSelectedDate(day);
        dispatch(replaceDateSelection(format(day, "yyyy-MM-dd")))
    };

    useEffect(() => {
        if (selectDate) {
            if (!isSameDay(selectedDate, selectDate)) {
                setSelectedDate(selectDate);
                setTimeout(() => {
                    let view = document.getElementById('selected');
                    if (view) {
                        view.scrollIntoView({behavior: "smooth", inline: "center", block: "nearest"});
                    }
                }, 20);
            }
        }
    }, [selectDate]);

    return <React.Fragment>{renderDays()}</React.Fragment>
}




export { DateView }