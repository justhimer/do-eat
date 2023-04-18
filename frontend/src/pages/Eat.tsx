import { IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, } from '@ionic/react';
import { FoodList } from '../components/food/FoodList';
import AppStyle from '../scss/App.module.scss';
import { cartOutline } from 'ionicons/icons';

function EatTab(){
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Eat</IonTitle>
          <IonIcon icon={cartOutline} slot="end"> </IonIcon>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className={AppStyle.hero}>
        <FoodList />
      </IonContent>

    </IonPage>
  );
};

export default EatTab;
