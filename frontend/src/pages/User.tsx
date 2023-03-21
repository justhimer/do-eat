import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './User.scss';
import { UserList } from '../components/UserList';

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

        <UserList />

      </IonContent>
    </IonPage>
  );
};

export default Tab4;
