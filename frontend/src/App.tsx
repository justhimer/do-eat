import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonModal,
  IonRouterLink,
  IonRouterOutlet,
  IonTab,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { accessibilityOutline, barbellOutline, ellipse, fastFoodOutline, qrCode, qrCodeOutline, square, storefront, storefrontOutline, triangle } from 'ionicons/icons';
/* Routing */
import Fooddetails from './components/Fooddetails';
import { UserProfile } from './components/user/UserProfile';
import { UserSubscription } from './components/user/UserSubscription';
import { UserSignupForm } from './components/auth/UserSignupForm';
import { GymCourses } from './components/do/superstructure/GymCourses';
import { GymConfirmation } from './components/do/superstructure/GymConfirmation';
import { GymsDo } from './pages/gyms/GymsDo';
import { GymsEat } from './pages/gyms/GymsEat';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';

import HomeTab from './pages/Home';
import DoTab from './pages/Do';
import EatTab from './pages/Eat';
import UserTab from './pages/User';

/* for QR code */
import QRCode from "react-qr-code";

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { FacebookCallback } from './components/auth/FacebookCallback';

/* custom SCSS modules */
import TabStyle from "./scss/TabBar.module.scss";
import AppStyle from './scss/App.module.scss';
import "./scss/RootChanges.scss"

import { GymPrivateRouter } from './components/private_routes/GymPrivateRoute';
import Login from './components/auth/Login';
import { UserScheduleList } from './components/user/UserScheduleList';
import { UserOrderList } from './components/user/UserOrderList';
import { CourseCreate } from './components/gyms/superstructure/CourseCreate';
import { CourseDetails } from './components/gyms/superstructure/CourseDetails';
import { ShoppingCart } from './components/ShoppingCart/cart';
import { GymProfile } from './components/gym_user/GymProfile';
import { GymScheduleList } from './components/gym_user/GymScheduleList';
import { GymOrderList } from './components/gym_user/GymOrderList';
import { useRef } from 'react';
import { UserQR } from './components/qr/UserQR';
import { GymQR } from './components/qr/GymQR';
import { useQuery } from '@tanstack/react-query';
import { fetchGymInfo } from './api/gymAPIs';
import { fetchUserInfo } from './api/userAPIs';
import { gymAction } from './redux/gymSlice';
import { userAction } from './redux/userSlice';

setupIonicReact();

const App: React.FC = () => {

  const userID = useSelector((state: RootState) => state.user.id);
  const gymID = useSelector((state: RootState) => state.gym.id);

  const isUserLoggedIn = useSelector((state: RootState) => state.user.isAuthenticated);
  const isGymLoggedIn = useSelector((state: RootState) => state.gym.isAuthenticated)

  // auto logout in case of inconsistance between token and database
  const dispatch = useDispatch();
  const { data } = useQuery({
    queryKey: ["logged_in"],
    queryFn: async () => {
      if (isUserLoggedIn) {
        const user = await fetchUserInfo();
        if (!user) {
          dispatch(userAction.logout());
        }
      }
      if (isGymLoggedIn) {
        const gym = await fetchGymInfo();
        if (!gym) {
          dispatch(gymAction.logout());
        }
      }
      return {};
    },
  });

  // switch tabs between user and gym
  const navigationSwitch = (type: 'do-tab' | 'eat-tab') => {
    if (isGymLoggedIn) {
      switch (type) {
        case 'do-tab':
          return '/gyms-do'
          break;
        case 'eat-tab':
          return '/gyms-eat'
          break;
      }
    } else {
      switch (type) {
        case 'do-tab':
          return '/do-tab'
          break;
        case 'eat-tab':
          return '/eat-tab'
          break;
      }
    }
  }

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>

          <IonRouterOutlet>

            {/* nav bar */}
            <Route exact path="/">
              <Redirect to="/home-tab" />
            </Route>
            <Route exact path="/home-tab">
              <HomeTab />
            </Route>
            <Route exact path="/do-tab">
              <DoTab />
            </Route>
            <Route path="/eat-tab">
              <EatTab />
            </Route>
            <Route path="/user-tab">
              <UserTab />
            </Route>

            {/* auth routes */}
            <Route path="/facebook-callback">
              <FacebookCallback />
            </Route>
            <Route path="/login">
              <UserTab />
            </Route>
            <Route path="/signup">
              <UserSignupForm />
            </Route>

            {/* user routes */}
            <Route path="/user-profile">
              <UserProfile />
            </Route>
            <Route path="/user-subscription">
              <UserSubscription />
            </Route>
            <Route path="/user-courses">
              <UserScheduleList />
            </Route>
            <Route path="/user-orders">
              <UserOrderList />
            </Route>

            {/* gym user routes */}
            <Route path="/gym-profile" component={() => <GymPrivateRouter component={<GymProfile />} />}>
            </Route>
            <Route path="/gym-coming-courses" component={() => <GymPrivateRouter component={<GymScheduleList />} />}>
            </Route>
            <Route path="/gym-food-orders" component={() => <GymPrivateRouter component={<GymOrderList />} />}>
            </Route>

            {/* do routes */}
            <Route exact path="/do-what">
              <GymCourses />
            </Route>
            <Route exact path="/do-it">
              <GymConfirmation />
            </Route>

            {/*gym CMS routes */}
            <Route exact path="/gyms-do" >
              <GymsDo />
            </Route>
            <Route exact path='/create-course'>
              <CourseCreate />
            </Route>
            <Route exact path='/details-course'>
              <CourseDetails />
            </Route>
            <Route exact path="/gyms-eat" >
              <GymsEat />
            </Route>

            {/* food routes */}
            <Route path="/fooddetails/:id" component={Fooddetails}>
            </Route>
            <Route path="/food-cart">
              <ShoppingCart />
            </Route>

          </IonRouterOutlet>

          <IonTabBar slot="bottom" className={TabStyle.tab_bar}>
            <IonTabButton tab="home-tab" href="/home-tab" nav-clear>
              <IonIcon aria-hidden="true" icon={storefrontOutline} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>

            <IonTabButton tab="do-tab" href={navigationSwitch('do-tab')} nav-clear>
              <IonIcon aria-hidden="true" icon={barbellOutline} />
              <IonLabel>Do</IonLabel>
            </IonTabButton>


            {/* invisible button for applying QR code css */}
            <IonTabButton disabled={false}>
              <IonFab horizontal="center" className={TabStyle.reposition}>
                <IonFabButton id="open-qr" className={TabStyle.button} translucent={true}>
                  <IonIcon aria-hidden="true" icon={qrCodeOutline}></IonIcon>
                </IonFabButton>
              </IonFab>
            </IonTabButton>

            <IonTabButton tab="eat-tab" href={navigationSwitch('eat-tab')} nav-clear>
              <IonIcon aria-hidden="true" icon={fastFoodOutline} />
              <IonLabel>Eat</IonLabel>
            </IonTabButton>

            <IonTabButton tab="user-tab" href="/user-tab" nav-clear>
              <IonIcon aria-hidden="true" icon={accessibilityOutline} />
              <IonLabel>User</IonLabel>
            </IonTabButton>

          </IonTabBar>


        </IonTabs>

        {/* <IonFab vertical="bottom" horizontal="center" slot="fixed" className={TabStyle.reposition}>
              <IonFabButton className={TabStyle.button} translucent={true}>
                <IonIcon aria-hidden="true" icon={qrCodeOutline}></IonIcon>
              </IonFabButton>
            </IonFab> */}

      </IonReactRouter>

      {/* QR Code Models */}
      {userID && <UserQR/>}
      {gymID && <GymQR/>}

    </IonApp>
  )
};

export default App;
