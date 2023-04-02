import { IonButton, IonCheckbox } from '@ionic/react';

interface DistrictItemInterface{
    checked: Boolean;
    id: number;
    name: string;
}

export function DistrictItem(props: DistrictItemInterface) {

    if (props.checked){
        return (
            <IonCheckbox id={`checkbox_${props.id}`} labelPlacement="end" checked>{props.name}</IonCheckbox>
        )
    }else{
        return(
            <IonCheckbox id={`checkbox_${props.id}`} labelPlacement="end">{props.name}</IonCheckbox>
        )
    }
    
}