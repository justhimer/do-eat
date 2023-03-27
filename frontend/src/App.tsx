import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonButton,
  IonFab,
  IonFabButton,
  IonIcon,
  IonLabel,
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
import { FacebookCallback } from './components/FacebookCallback';

/* custom SCSS modules */
import tabStyle from "./scss/TabBar.module.scss"
import "./scss/RootChanges.scss"


setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>


        <IonRouterOutlet>

          {/* nav bar */}
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
          <Route exact path="/">
            <Redirect to="/home-tab" />
          </Route>

          {/* other routes */}
          <Route path="/facebook-callback">
            <FacebookCallback />
          </Route>

        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="home-tab" href="/home-tab">
            <IonIcon aria-hidden="true" icon={storefrontOutline} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>

          <IonTabButton tab="do-tab" href="/do-tab">
            <IonIcon aria-hidden="true" icon={barbellOutline} />
            <IonLabel>Do</IonLabel>
          </IonTabButton>

          {/* invisible button for applying QR code css */}
          <IonTabButton>
          </IonTabButton>

          <IonTabButton tab="eat-tab" href="/eat-tab">
            <IonIcon aria-hidden="true" icon={fastFoodOutline} />
            <IonLabel>Eat</IonLabel>
          </IonTabButton>

          <IonTabButton tab="user-tab" href="/user-tab">
            <IonIcon aria-hidden="true" icon={accessibilityOutline} />
            <IonLabel>User</IonLabel>
          </IonTabButton>

        </IonTabBar>


      </IonTabs>
      <IonFab vertical="bottom" horizontal="center" slot="fixed" className={tabStyle.reposition}>
        <IonFabButton className={tabStyle.button}>
          <IonIcon aria-hidden="true" icon={qrCodeOutline}></IonIcon>
        </IonFabButton>
      </IonFab>
    </IonReactRouter>
  </IonApp>
);

export default App;
