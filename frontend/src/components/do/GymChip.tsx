import { IonChip , IonAvatar, IonLabel,IonIcon } from "@ionic/react";
import { closeCircle} from 'ionicons/icons';
import { useDispatch } from "react-redux";
import { removeGymSelection } from "../../redux/userGymSlice";

export interface GymChipInterface {
    id: number;
    name: string;
}

export function GymChip(props: GymChipInterface) {

    const dispatch = useDispatch()

    return (
        <IonChip onClick={()=>dispatch(removeGymSelection(props.id))}>
            <IonLabel>{props.name}</IonLabel>
            <IonIcon icon={closeCircle}></IonIcon>
        </IonChip>
    )
}