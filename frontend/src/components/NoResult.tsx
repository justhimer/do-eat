import { IonCard, IonCardContent, IonItem, IonLabel, IonList } from "@ionic/react";
import UserMenuStyle from "../scss/UserMenu.module.scss";
import NoResultStyle from "../scss/NoResult.module.scss"

export function NoResult() {
    return (
        <IonCard>
            <IonCardContent className={NoResultStyle.container}>
                <img src="./assets/icon/no_result.png" alt="" className={NoResultStyle.img} />
                <IonLabel className={NoResultStyle.word}>No Result</IonLabel>
            </IonCardContent>
        </IonCard>
    )
}