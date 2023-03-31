import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { CornerBox } from '../components/CornerBox';
import { Logo } from '../components/Logo';
import AppStyle from '../scss/App.module.scss';

const HomeTab: React.FC = () => {
  return (
    <IonPage >
      <IonHeader >
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className={AppStyle.hero}>
          <Logo />
          <CornerBox />
        </div>
      </IonContent>
    </IonPage >
  );
};

export default HomeTab;
