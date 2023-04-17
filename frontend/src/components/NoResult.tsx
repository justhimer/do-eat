import { IonCard, IonCardContent, IonLabel } from "@ionic/react";
import UserMenuStyle from "../scss/UserMenu.module.scss";

export function NoResult() {
    console.log('did');
    return (
        <IonCard>
            <IonCardContent>
                <img src="./assets/icon/no_result.png" alt="" className={UserMenuStyle.icon_square} />
                <IonLabel>No Result</IonLabel>
            </IonCardContent>
        </IonCard>
    )
}