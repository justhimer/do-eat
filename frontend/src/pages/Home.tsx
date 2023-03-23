import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import AppStyle from '../scss/App.module.scss';

const HomeTab: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        {/* <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader> */}

        <div className={AppStyle.hero}>
          <header className={AppStyle.Iam}>
            <p>Do Eat</p>
            <b>
              <div className={AppStyle.innerIam}>
                just do<br />
                eat later<br />
                just do! eat later !!<br />
                不能逃避。<br />
                逃げちゃだめだ!!
              </div>
            </b>

          </header>
        </div>

      </IonContent>
    </IonPage >
  );
};

export default HomeTab;
