import { IonThumbnail,IonItem,IonLabel,IonCardSubtitle, IonContent, useIonToast } from '@ionic/react';
import { SelectedGymInterface, toggleGymSelection } from '../../redux/userGymSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import NotificationStyle from "../../scss/Notification.module.scss"

interface GymCardInterface {
    district: string;
    name: string;
    icon: string;
    details: string;
    id: number;
}


export function SoloGym(props: GymCardInterface) {
  const selectedGyms = useSelector((state:RootState)=>state.userGym)
  const dispatch = useDispatch()
  const [present] = useIonToast();
    const presentToast = (position: 'top' | 'middle' | 'bottom') => {
        present({
            message: "Error: You may only choose up to 3 gyms at a time",
            duration: 1500,
            position: position,
            cssClass: NotificationStyle.ionicToast,
        });
    };
    const clickGym = ()=>{
      if (!selectedGyms.some(e=>e.name === props.name) && selectedGyms.length >= 3){
        presentToast("top")
      }else{
        dispatch((toggleGymSelection({id:props.id, name:props.name})))
      }
    }


    return (
        <IonItem onClick={clickGym}>
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