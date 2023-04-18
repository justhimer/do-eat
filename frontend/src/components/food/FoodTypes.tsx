import { IonSelectOption } from "@ionic/react";

interface FoodTypesProps {
    id: number;
    name: string;
}

export function FoodTypes(props: FoodTypesProps) {
    return (
        <IonSelectOption value={props.id}>
            {props.name}
        </IonSelectOption>
    )
}