import { IonSelectOption } from '@ionic/react';

interface DistrictItemInterface{
    id: number;
    name: string;
}

export function DistrictItem(props: DistrictItemInterface) {
        return (
            <IonSelectOption value={props.id}>{props.name}</IonSelectOption>
        )
}