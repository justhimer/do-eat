import { IonContent, IonHeader, IonIcon, IonLabel, IonPage, IonTitle, IonToolbar, useIonViewWillEnter, } from '@ionic/react';
import { FoodList } from '../components/food/FoodList';
import AppStyle from '../scss/App.module.scss';
import { cartOutline, flameSharp } from 'ionicons/icons';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { fetchCalories } from '../api/calorieTransactionAPIs';

function EatTab() {

  const isUserLoggedIn = useSelector((state: RootState) => state.user.isAuthenticated);

  const { data: calories, refetch } = useQuery({
    queryKey: ["calories"],
    queryFn: fetchCalories,
  });

  useIonViewWillEnter(() => {
    refetch()
  })

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Eat</IonTitle>
          {isUserLoggedIn && <IonLabel slot='end'> <IonIcon icon={flameSharp} /> {calories}</IonLabel>}
          {/* <IonIcon icon={cartOutline} slot="end"> </IonIcon> */}
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className={AppStyle.hero}>
        <FoodList />
      </IonContent>

    </IonPage>
  );
};

export default EatTab;
