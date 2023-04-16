import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useDispatch, useSelector } from 'react-redux';
import Login from '../components/auth/Login';
import { UserMenu } from '../components/user/UserMenu';
import { RootState } from '../redux/store';
import AppStyle from '../scss/App.module.scss';
import { GymMenu } from '../components/gym_user/GymMenu';

const UserTab: React.FC = () => {

  const isUserLoggedIn = useSelector((state: RootState) => state.user.isAuthenticated);
  const isGymLoggedIn = useSelector((state: RootState) => state.gym.isAuthenticated);

  return (
    <IonPage>

      <IonHeader>
        <IonToolbar>
          <IonTitle>User</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className={AppStyle.hero}>
        {!isUserLoggedIn && !isGymLoggedIn ? (<Login />) : (<></>)}
        {isUserLoggedIn ? (<UserMenu />) : (<></>)}
        {isGymLoggedIn ? (<GymMenu />) : (<></>)}
      </IonContent>

    </IonPage>
  );
};

export default UserTab;
