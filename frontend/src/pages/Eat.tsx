import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { FoodList } from '../components/FoodList';
import './Eat.scss';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Eat</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Eat</IonTitle>
          </IonToolbar>
        </IonHeader>

        <FoodList />
        
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
