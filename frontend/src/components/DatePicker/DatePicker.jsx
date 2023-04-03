import { addDays } from "date-fns";
import hexToRgb from "../../../node_modules/hex-to-rgb/index";
import dateStyles from "../DatePicker/DatePicker.module.css"
import { DateView } from "./Dateview";



const DatePicker = (props) => {
    const next = (event) => {
        event.preventDefault();
        const e = document.getElementById('container');
        const width = e ? e.getBoundingClientRect().width : null;
        e.scrollLeft += width - 60;
    };

    const prev = (event) => {
        event.preventDefault();
        const e = document.getElementById('container');
        const width = e ? e.getBoundingClientRect().width : null;
        e.scrollLeft -= width - 60;
    };

    const primaryColor = props.color ? (props.color.indexOf("rgb") > 0 ? props.color : hexToRgb(props.color)) : 'rgb(54, 105, 238)';

    const startDate = props.startDate || new Date();
    const lastDate = addDays(startDate, props.numOfDays || 90);

    let buttonzIndex = { zIndex: 2 };
    let buttonStyle = { background: primaryColor };
    let Component = DateView;

    return (
        <>
            <div className={dateStyles.container}>
                <Component {...props} primaryColor={primaryColor} startDate={startDate} lastDate={lastDate} />
            </div>
            <div className={dateStyles.buttonWrapper} style={buttonzIndex}>
                <button className={dateStyles.button} style={buttonStyle} onClick={prev}>&lt;</button>
            </div>
            <div className={dateStyles.buttonWrapper} style={buttonzIndex}>
                <button className={dateStyles.button} style={buttonStyle} onClick={next}>&gt;</button>
            </div>
        </>
    )
}

export { DatePicker }