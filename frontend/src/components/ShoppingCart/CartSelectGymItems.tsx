import { IonSelectOption } from "@ionic/react";

export interface CartSelectGymItemsProps {
    gym_id: number;
    gym_name: string;
}

export function CartSelectGymItems(props: CartSelectGymItemsProps) {
    return (
        <IonSelectOption value={props.gym_id}>{props.gym_name}</IonSelectOption>
    )
}