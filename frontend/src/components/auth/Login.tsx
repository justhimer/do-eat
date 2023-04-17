import UserStyle from '../../scss/User.module.scss';

import { IonLabel, IonSegment, IonSegmentButton } from '@ionic/react';
import { useState } from 'react';
import { Logo } from '../Logo';
import { UserLoginForm } from './UserLoginForm';
import { GymLoginForm } from './GymLoginForm';

export function Login() {

    const defaultWhoLogin = "user";
    const [whoLogin, setWhoLogin] = useState<string>(defaultWhoLogin);

    return (
        <>

            <Logo />
            {/* <CornerBox /> */}

            <div className={UserStyle.form}>

                <div className={UserStyle.title}>
                    <h2>Login</h2>
                </div>

                <IonSegment
                    value={whoLogin}
                    className={UserStyle.segment}
                    onIonChange={(e) => { setWhoLogin(e.detail.value!); }}
                >
                    <IonSegmentButton value="user">
                        <IonLabel>User</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="gym">
                        <IonLabel>Gym</IonLabel>
                    </IonSegmentButton>
                </IonSegment>

                {whoLogin === "user" ? (<UserLoginForm />) : (<GymLoginForm />)}

            </div>

        </>
    );
}
export default Login;