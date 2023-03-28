import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { Logo } from '../components/Logo';
import AppStyle from '../scss/App.module.scss';

const HomeTab: React.FC = () => {
  return (
    <IonPage >
      <IonHeader >
        <IonToolbar className={AppStyle.tool_bar}>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        {/* <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader> */}

        <div className={AppStyle.hero}>
          <Logo />
        </div>

      </IonContent>
    </IonPage >
  );
};

export default HomeTab;
