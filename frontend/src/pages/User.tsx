import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Login from '../components/auth/Login';
import { Logout } from '../components/auth/Logout';
import { UserMenu } from '../components/UserMenu';
import { RootState } from '../redux/store';
import AppStyle from '../scss/App.module.scss';

const UserTab: React.FC = () => {

  const history = useHistory();
  const isUserLoggedIn = useSelector((state: RootState) => state.user.isAuthenticated);
  const isGymLoggedIn = useSelector((state: RootState) => state.gym.isAuthenticated);

  return (
    <IonPage>

      <IonHeader>
        <IonToolbar>
          <IonTitle>User</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className={AppStyle.hero}>
          {!isUserLoggedIn && !isGymLoggedIn ? (<Login />) : (<></>)}
          {isUserLoggedIn ? (<UserMenu />) : (<></>)}
          {isGymLoggedIn ? (<Logout />) : (<></>)}
        </div>
      </IonContent>

    </IonPage>
  );
};

export default UserTab;
