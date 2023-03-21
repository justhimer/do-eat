import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import AppStyle from '../scss/App.module.scss';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        {/* <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader> */}

        <div className={AppStyle.hero}></div>

      </IonContent>
    </IonPage>
  );
};

export default Tab1;
