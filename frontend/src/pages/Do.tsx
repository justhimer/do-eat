import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { DistrictList } from '../components/districts/DistrictList';
import AppStyle from '../scss/App.module.scss';
import { SelectedGymsDisplay } from '../components/gyms/SelectedGymsDisplay';
import { GymList } from '../components/gyms/GymList';



const DoTab: React.FC = () => {


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Do</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className={AppStyle.hero}>
          <DistrictList />
          <SelectedGymsDisplay/>

      </IonContent>
      
    </IonPage>
  );
};

export default DoTab;
