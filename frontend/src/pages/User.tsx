import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { CornerBox } from '../components/CornerBox';
import { FacebookLogin } from '../components/FacebookLogin';
import LoginInForm from '../components/LoginForm';
import { Logo } from '../components/Logo';
import { Logout } from '../components/Logout';
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
            <LoginInForm />
            <div className={UserStyle.text}>Alternative Login Methods :</div>
            <FacebookLogin />
            <Logout />
          </div>
        </div>
      </IonContent>

    </IonPage>
  );
};

export default UserTab;
