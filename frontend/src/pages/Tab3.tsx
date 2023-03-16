import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { FoodList } from '../components/FoodList';
import './Tab3.css';

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
        
        {/* <ExploreContainer name="Tab 3 page" /> */}
        
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
