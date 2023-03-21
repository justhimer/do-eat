import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { DistrictList } from '../components/DistrictList';
import './Do.scss';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Do</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Do</IonTitle>
          </IonToolbar>
        </IonHeader>

        <DistrictList />

      </IonContent>
    </IonPage>
  );
};

export default Tab2;
