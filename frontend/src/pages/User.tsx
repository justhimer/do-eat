import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Login from '../components/auth/Login';
import { Logout } from '../components/auth/Logout';
import { UserMenu } from '../components/user/UserMenu';
import { RootState } from '../redux/store';
import AppStyle from '../scss/App.module.scss';
import { fetchUserInfo } from '../api/userAPIs';
import { useQuery } from '@tanstack/react-query';
import { userAction } from '../redux/userSlice';
import { fetchGymInfo } from '../api/gymAPIs';
import { gymAction } from '../redux/gymSlice';

const UserTab: React.FC = () => {

  // const dispatch = useDispatch();
  
  const isUserLoggedIn = useSelector((state: RootState) => state.user.isAuthenticated);
  const isGymLoggedIn = useSelector((state: RootState) => state.gym.isAuthenticated);

  // useQuery({
  //   queryKey: ["logged_in"],
  //   queryFn: async () => {
  //     const user = await fetchUserInfo();
  //     const gym = await fetchGymInfo();
  //     if (!user && !gym) {
  //       dispatch(userAction.logout());
  //       dispatch(gymAction.logout());
  //     }
  //   },
  // });

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
        {isGymLoggedIn ? (<Logout remove={() => { }} />) : (<></>)}
      </IonContent>

    </IonPage>
  );
};

export default UserTab;
