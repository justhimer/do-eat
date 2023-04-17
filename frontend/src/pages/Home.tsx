import { IonContent, IonGrid, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { CornerBox } from '../components/CornerBox';
import { Logo } from '../components/Logo';
// import { homeApp } from '../homePageDetails';
import AppStyle from '../scss/App.module.scss';

const HomeTab: React.FC = () => {
  return (
    <IonPage >
      <IonHeader >
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className={AppStyle.hero}>
        <Logo />
        <CornerBox />
        {/* <homeApp /> */}
      </IonContent>
    </IonPage >
  );
};

export default HomeTab;
