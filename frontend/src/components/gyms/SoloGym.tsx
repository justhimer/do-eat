import { IonThumbnail,IonItem,IonLabel,IonCardSubtitle, IonContent } from '@ionic/react';
import { SelectedGymInterface, toggleGymSelection } from '../../redux/userGymSlice';
import { useDispatch } from 'react-redux';

interface GymCardInterface {
    district: string;
    name: string;
    icon: string;
    details: string;
    id: number;
}


export function SoloGym(props: GymCardInterface) {

  const dispatch = useDispatch()

    return (
        <IonItem onClick={()=>dispatch(toggleGymSelection({id:props.id, name:props.name}))}>
            <IonThumbnail slot="start">
              <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
            </IonThumbnail>
            <IonContent>
              <IonLabel>{props.name}</IonLabel>
              <IonCardSubtitle>{props.district}</IonCardSubtitle>
            </IonContent>
          </IonItem>
    )
}