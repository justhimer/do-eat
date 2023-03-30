import { IonLabel, IonSegment, IonSegmentButton } from '@ionic/react';
import { useState } from 'react';
import UserStyle from '../../scss/User.module.scss';
import { CornerBox } from '../CornerBox';
import { Logo } from '../Logo';
import { EmailLoginForm } from './EmailLoginForm';
import { FacebookLogin } from './FacebookLogin';
import { Logout } from './Logout';
import { UsernameLoginForm } from './UsernameLoginForm';

export function LoginForm() {

    const defaultLoginMethod = "email";

    const [loginMethod, setLoginMethod] = useState<string>(defaultLoginMethod);

    return (
        <>

            <Logo />
            {/* <CornerBox /> */}

            <div className={UserStyle.form}>

                <div className={UserStyle.title}>
                    <h2>User Login</h2>
                </div>

                <IonSegment
                    value={loginMethod}
                    className={UserStyle.segment}
                    onIonChange={(e) => { setLoginMethod(e.detail.value!); }}
                >
                    <IonSegmentButton value="email">
                        <IonLabel>By Email</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="username">
                        <IonLabel>By Username</IonLabel>
                    </IonSegmentButton>
                </IonSegment>

                {loginMethod === "email" ? (<EmailLoginForm />) : (<UsernameLoginForm />)}

                <div className={UserStyle.text}>Alternative Login Methods :</div>
                <FacebookLogin />
                <Logout />

            </div>

        </>
    );
}
export default LoginForm;