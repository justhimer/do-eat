import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import LoginForm from '../components/auth/LoginForm';
import { UserProfile } from '../components/UserProfile';
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
        <div className={AppStyle.hero}>
            <LoginForm />
            {/* <UserProfile /> */}
        </div>
      </IonContent>

    </IonPage>
  );
};

export default UserTab;
