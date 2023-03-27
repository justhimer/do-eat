import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { CornerBox } from '../components/CornerBox';
import { Login } from '../components/Login';
import { Logout } from '../components/Logout';
import AppStyle from '../scss/App.module.scss';

const UserTab: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>User</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        {/* <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">User</IonTitle>
          </IonToolbar>
        </IonHeader> */}

        <div className={AppStyle.hero}>
          <CornerBox />
          <Login />
          <Logout />
        </div>

      </IonContent>
    </IonPage>
  );
};

export default UserTab;
