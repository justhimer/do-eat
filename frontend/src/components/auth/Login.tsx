import { IonLabel, IonSegment, IonSegmentButton } from '@ionic/react';
import { useState } from 'react';
import UserStyle from '../../scss/User.module.scss';
import { CornerBox } from '../CornerBox';
import { Logo } from '../Logo';
import { UserLoginForm } from './UserLoginForm';
import { FacebookLogin } from './FacebookLogin';
import { Logout } from './Logout';
import { GymLoginForm } from './GymLoginForm';

export function Login() {

    const defaultLoginMethod = "email";
    const [loginMethod, setLoginMethod] = useState<string>(defaultLoginMethod);

    return (
        <>

            <Logo />
            {/* <CornerBox /> */}

            <div className={UserStyle.form}>

                <div className={UserStyle.title}>
                    <h2>Login</h2>
                </div>

                <IonSegment
                    value={loginMethod}
                    className={UserStyle.segment}
                    onIonChange={(e) => { setLoginMethod(e.detail.value!); }}
                >
                    <IonSegmentButton value="email">
                        <IonLabel>User</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="username">
                        <IonLabel>Gym</IonLabel>
                    </IonSegmentButton>
                </IonSegment>

                {loginMethod === "email" ? (<UserLoginForm />) : (<GymLoginForm />)}

            </div>

        </>
    );
}
export default Login;