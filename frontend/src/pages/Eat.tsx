import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { FoodList } from '../components/FoodList';
import AppStyle from '../scss/App.module.scss';

const EatTab: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Eat</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className={AppStyle.hero}>
          <FoodList />
      </IonContent>

    </IonPage>
  );
};

export default EatTab;
