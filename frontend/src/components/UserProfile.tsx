import { IonBackButton, IonButton, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import UserMenuStyle from "../scss/UserMenu.module.scss";
import UserProfileStyle from "../scss/UserProfile.module.scss";

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
                <IonList className={UserProfileStyle.list}>
                    <IonItem button detail={true} className={UserMenuStyle.item}>
                        <IonLabel>
                           <h2 className={UserMenuStyle.length_30}>Email:</h2>
                           <p className={UserMenuStyle.length_70}>{email}</p>
                        </IonLabel>
                    </IonItem>
                    <IonItem detail={true} className={UserMenuStyle.item}>
                        <IonLabel>
                           <h2 className={UserMenuStyle.length_30}>Username:</h2>
                           <p className={UserMenuStyle.length_70}>{username}</p>
                        </IonLabel>
                    </IonItem>
                    <IonItem detail={true} className={UserMenuStyle.item}>
                        <IonLabel>
                           <h2 className={UserMenuStyle.length_50}>Subscribtion:</h2>
                           <p className={UserMenuStyle.length_50}>No</p>
                        </IonLabel>
                    </IonItem>
                </IonList>
            </IonContent>
        </IonPage >
    )
}