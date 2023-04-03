import { IonContent } from "@ionic/react";
import { DatePicker } from "../DatePicker/DatePicker";

export function CoursesPick(){

    const selectedDay = (val:any)=>{
        console.log(val)
    }
    return <IonContent>
        <DatePicker 
                getSelectedDay={selectedDay}
                startDate={new Date}
                numOfDays={14}
                selectDate={new Date}
                labelFormat={"MMMM"}
                color={"#374e8c"} 
                marked={[
                    {
                        date: new Date(2023, 3, 5),
                        marked: true,
                    },
                    {
                        date: new Date(2023, 3, 7),
                        marked: true,
                    },
                ]}
                />

    </IonContent>
}