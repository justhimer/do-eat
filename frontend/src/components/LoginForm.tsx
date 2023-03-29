import { IonButton, IonInput, IonItem, IonLabel, IonList, IonSegment, IonSegmentButton } from '@ionic/react';
import LoginStyle from '../scss/LoginForm.module.scss';
import UserStyle from '../scss/User.module.scss';

function LoginInForm() {

    async function login() {

    }

    return (
        <>

            <div className={LoginStyle.title}>
                <h2>User Login</h2>
            </div>

            <IonSegment value="default" className={LoginStyle.segment}>
                <IonSegmentButton value="default">
                    <IonLabel>By Email</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="segment">
                    <IonLabel>By Username</IonLabel>
                </IonSegmentButton>
            </IonSegment>

            <IonList className={LoginStyle.form}>
                <IonItem>
                    <IonLabel>Email</IonLabel>
                    <IonInput placeholder="Enter your email"></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel>Password</IonLabel>
                    <IonInput type="password" value="" placeholder="Enter your password"></IonInput>
                </IonItem>
            </IonList>

            <IonButton onClick={login} className={UserStyle.button}>Login</IonButton>

        </>
    );
}
export default LoginInForm;