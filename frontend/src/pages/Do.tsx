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
      <IonContent fullscreen>

        {/* <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Do</IonTitle>
          </IonToolbar>
        </IonHeader> */}

        <div className={AppStyle.hero}>
          <DistrictList />
        </div>

      </IonContent>
    </IonPage>
  );
};

export default DoTab;