// Ionic Component
import { IonThumbnail,IonItem,IonLabel,IonCardSubtitle, IonContent, useIonToast } from '@ionic/react';

// State Management
import { toggleGymSelection } from '../../redux/userGymSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

// Custom Component
import NotificationStyle from "../../scss/Notification.module.scss"
import GymCourseStyle from '../../scss/GymCourses.module.scss'

interface GymCardInterface {
    district: string;
    name: string;
    icon: string;
    details: string;
    id: number;
    selected: boolean;
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
    console.log(props.name ," ", props.selected)
    return (
        <IonItem onClick={clickGym} lines='none' className={GymCourseStyle.soloGym} style={props.selected? {"filter": "grayscale(60%)"} : {}}>
            <IonThumbnail slot="start">
              <img src='./assets/gym_image/default_gym_icon.png' />
            </IonThumbnail>
            <div>
              <IonLabel>{props.name}</IonLabel>
              <IonCardSubtitle>{props.district}</IonCardSubtitle>
            </div>
          </IonItem>
    )
}