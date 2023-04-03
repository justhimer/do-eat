import { useEffect, useState } from "react";
import { DoButtonInterface } from "../../pages/Do";
import { IonContent } from "@ionic/react";

export function DoButton(props:DoButtonInterface){
    
    const [buttonDisplay, setButtonDisplay] = useState(<IonContent>Rendering...</IonContent>)
    useEffect(()=>{
        if(props.page < 2){
            setButtonDisplay(
            <IonContent>
                <div onClick={props.upPage}>Next</div>
            </IonContent>
            )
        }else{
            setButtonDisplay(
            <IonContent>
                <div onClick={props.upPage}>Next</div>
                <div onClick={props.downPage}>Back</div>
            </IonContent>
            )
        }
    },[props.page])

    return (
        buttonDisplay
    )

}