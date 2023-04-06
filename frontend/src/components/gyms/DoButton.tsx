import { useEffect, useState } from "react";
import { DoButtonInterface } from "../../pages/Do";
import { IonContent } from "@ionic/react";
import GymStyle from '../../scss/GymCourses.module.scss'

export function DoButton(props:DoButtonInterface){
    
    const [buttonDisplay, setButtonDisplay] = useState(<IonContent>Rendering...</IonContent>)
    useEffect(()=>{
        if(props.page < 2){
            setButtonDisplay(
            <IonContent className={GymStyle.bottomButtons}>
                <div onClick={props.upPage}>Next</div>
            </IonContent>
            )
        }else{
            setButtonDisplay(
            <IonContent className={GymStyle.bottomButtons}>
                <div onClick={props.downPage}>Back</div>
            </IonContent>
            )
        }
    },[props.page])

    return (
        buttonDisplay
    )

}