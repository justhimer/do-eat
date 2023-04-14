import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { FoodList } from '../components/FoodList';
import AppStyle from '../scss/App.module.scss';

function EatTab(){
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
