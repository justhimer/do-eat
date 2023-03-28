import { IonButton } from '@ionic/react';

interface DistrictItemProps {
    id: number;
    name: string;
}

export function DistrictItem(props: DistrictItemProps) {

    return (
        <IonButton size="large" color="dark" >{props.name}</IonButton>
    )
}