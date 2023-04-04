import { IonBackButton, IonButton, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import UserMenuStyle from "../../scss/UserMenu.module.scss";
import AppStyle from '../../scss/App.module.scss';

export function UserProfile() {

    const email = 'harry_porter@gmail.com'
    const username = 'Harry Porter'

    return (
        <IonPage >
            <IonHeader >
                <IonToolbar >
                    <IonButton slot="start">
                        <IonBackButton default-href="/"></IonBackButton>
                    </IonButton>
                    <IonTitle>User Profile</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonList className={UserMenuStyle.list}>
                    <IonItem button detail={true} className={UserMenuStyle.item}>
                        <IonLabel className={UserMenuStyle.label}>
                           <h2 className={UserMenuStyle.width_30}>Email:</h2>
                           <p className={UserMenuStyle.width_70}>{email}</p>
                        </IonLabel>
                    </IonItem>
                    <IonItem button detail={true} className={UserMenuStyle.item_last}>
                        <IonLabel className={UserMenuStyle.label}>
                           <h2 className={UserMenuStyle.width_30}>Username:</h2>
                           <p className={UserMenuStyle.width_70}>{username}</p>
                        </IonLabel>
                    </IonItem>
                </IonList>
            </IonContent>
        </IonPage >
    )
}