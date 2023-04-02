import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { DistrictList } from '../components/DistrictList';
import AppStyle from '../scss/App.module.scss';


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
      </IonContent>
      
    </IonPage>
  );
};

export default DoTab;
