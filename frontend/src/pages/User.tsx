import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { UserList } from '../components/UserList';
import AppStyle from '../scss/App.module.scss';

const Tab4: React.FC = () => {
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
        <UserList />
        </div>

      </IonContent>
    </IonPage>
  );
};

export default Tab4;
