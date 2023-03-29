import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { CornerBox } from '../components/CornerBox';
import LoginForm from '../components/auth/LoginForm';
import { Logo } from '../components/Logo';
import AppStyle from '../scss/App.module.scss';
import UserStyle from '../scss/User.module.scss';

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
          <CornerBox />
          <Logo />
          <div className={UserStyle.form}>
            <LoginForm />
          </div>
        </div>
      </IonContent>

    </IonPage>
  );
};

export default UserTab;
