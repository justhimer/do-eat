import { IonButton, IonInput, IonItem, IonLabel, IonList, useIonToast } from "@ionic/react";
import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { emailLogin } from "../../api/userAPIs";
import { RootState } from "../../redux/store";
import { userAction } from "../../redux/userSlice";
import LoginStyle from '../../scss/LoginForm.module.scss';
import UserStyle from '../../scss/User.module.scss';
import NotificationStyle from "../../scss/Notification.module.scss";

export function EmailLoginForm() {

    const [present] = useIonToast();

    const history = useHistory();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state: RootState) => state.users.isAuthenticated);

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    useEffect(() => {
        if (isLoggedIn) {
            // history.push("/home-tab");
            present({
                message: 'Login Success',
                duration: 1500,
                position: "top",
                cssClass: NotificationStyle.ionicToast,
            });
        }
    }, [isLoggedIn]);

    async function handleLogin(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const data = await emailLogin(email, password);
        if (data) {
            dispatch(userAction.login(data));
        } else {
            present({
                message: 'Login Failed',
                duration: 1500,
                position: "top",
                cssClass: NotificationStyle.ionicToast,
            });
        }
    }

    return (
        <form onSubmit={handleLogin}>
            <IonList className={LoginStyle.form}>
                <IonItem>
                    <IonLabel>Email: </IonLabel>
                    <IonInput aria-label="Email" type="email" value={email} placeholder="Enter your email" onIonChange={(e) => setEmail(`${e.detail.value!}`)} required></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel>Password: </IonLabel>
                    <IonInput aria-label="Password" type="password" value={password} placeholder="Enter your password" onIonChange={(e) => setPassword(`${e.detail.value!}`)} required></IonInput>
                </IonItem>
            </IonList>
            <IonButton type="submit" className={UserStyle.button}>Login</IonButton>
        </form>
    )
}