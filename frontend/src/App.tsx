import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonButton,
  IonFab,
  IonFabButton,
  IonIcon,
  IonLabel,
  IonRouterLink,
  IonRouterOutlet,
  IonTab,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { accessibilityOutline, barbellOutline, ellipse, fastFoodOutline, qrCode, qrCodeOutline, square, storefront, storefrontOutline, triangle } from 'ionicons/icons';
import HomeTab from './pages/Home';
import DoTab from './pages/Do';
import EatTab from './pages/Eat';
import UserTab from './pages/User';
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
import "./scss/RootChanges.scss"
import PrivateRouter from './components/PrivateRoute';
import Login from './components/auth/Login';
import Fooddetails from './components/Fooddetails';
import { UserProfile } from './components/user/UserProfile';
import { UserSubscription } from './components/user/UserSubscription';
import { UserCourses } from './components/user/UserCourses';
import { Signup } from './components/auth/Signup';
import { GymCourses } from './components/gyms/superstructure/GymCourses';
import { GymConfirmation } from './components/gyms/superstructure/GymConfirmation';

setupIonicReact();

const App: React.FC = () => (
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
          <Route exact path="/do-tab/" component={DoTab}/>
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
            <Signup />
          </Route>

          {/* user routes */}
          <Route path="/user-profile">
            <UserProfile />
          </Route>
          <Route path="/user-subscription">
            <UserSubscription />
          </Route>
          <Route path="/user-courses">
            <UserCourses />
          </Route>

          {/* gym routes */}
          <Route exact path="/test" component={GymCourses}>
            </Route>
            <Route exact path="/test2" component={GymConfirmation}>
              </Route>


          {/* food routes */}
          <Route path="/fooddetails/:id" component={Fooddetails}>
          </Route>

        </IonRouterOutlet>

        <IonTabBar slot="bottom" className={TabStyle.tab_bar}>
          <IonTabButton tab="home-tab" href="/home-tab" nav-clear>
            <IonIcon aria-hidden="true" icon={storefrontOutline} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>

          <IonTabButton tab="do-tab" href="/do-tab" nav-clear>
            <IonIcon aria-hidden="true" icon={barbellOutline} />
            <IonLabel>Do</IonLabel>
          </IonTabButton>


          {/* invisible button for applying QR code css */}
          <IonTabButton disabled={false}>
            <IonFab horizontal="center" className={TabStyle.reposition}>
              <IonFabButton className={TabStyle.button} translucent={true}>
                <IonIcon aria-hidden="true" icon={qrCodeOutline}></IonIcon>
              </IonFabButton>
            </IonFab>
          </IonTabButton>

          <IonTabButton tab="eat-tab" href="/eat-tab" nav-clear>
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
  </IonApp>
);

export default App;
