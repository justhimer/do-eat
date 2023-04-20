import { IonContent, IonHeader, IonIcon, IonLabel, IonPage, IonTitle, IonToolbar, useIonToast, useIonViewWillEnter, } from '@ionic/react';
import { FoodList } from '../components/food/FoodList';
import AppStyle from '../scss/App.module.scss';
import { cartOutline, flagOutline, flameSharp } from 'ionicons/icons';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { fetchCalories } from '../api/calorieTransactionAPIs';
import Fooddetailsstyle from '../scss/Fooddetails.module.scss'
import NotificationStyle from "../scss/Notification.module.scss";
import { useHistory } from 'react-router';

function EatTab() {

  const [present] = useIonToast()
  const history = useHistory()
  const isUserLoggedIn = useSelector((state: RootState) => state.user.isAuthenticated);
  // const { data: userCalories, refetch, isError } = useQuery({
  //   queryKey: ["eat_calories"],
  //   queryFn: fetchCalories,
  // });

  // useIonViewWillEnter(() => {
  //   refetch()
  // })
  const onCartIcon = () => {
    if (!isUserLoggedIn) {
        present({
            message: "Please Login",
            duration: 1000,
            position: "top",
            cssClass: NotificationStyle.ionicToast,
        });
        return;
    }
    history.push('/food-cart');
}

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Eat</IonTitle>
          {/* {userCalories && (<IonLabel slot='end'> <IonIcon icon={flameSharp} slot="end"></IonIcon>{userCalories}</IonLabel>)} */}
          {/* <IonIcon icon={cartOutline} slot="end"> </IonIcon> */}
          <IonIcon className={Fooddetailsstyle.icon} icon={cartOutline} slot="end" onClick={onCartIcon}></IonIcon>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className={AppStyle.hero}>
        <FoodList />
      </IonContent>

    </IonPage>
  );
}

export default EatTab;
