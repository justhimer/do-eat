import { IonButton, IonInput, IonItem, IonLabel, IonList, useIonToast } from "@ionic/react";
import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { emailLogin } from "../../api/userAPIs";
import { RootState } from "../../redux/store";
import { userAction } from "../../redux/userSlice";
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

    /*************************************/
    /*** ionic 7 input component start ***/
    /*************************************/

    const [isTouched, setIsTouched] = useState(false);
    const [isValid, setIsValid] = useState<boolean>();

    const validateEmail = (email: string) => {
        return email.match(
            /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        );
    };

    const validate = (ev: Event) => {
        const value = (ev.target as HTMLInputElement).value;

        setIsValid(undefined);

        if (value === '') return;

        validateEmail(value) !== null ? setIsValid(true) : setIsValid(false);
    };

    const markTouched = () => {
        setIsTouched(true);
    };

    /***********************************/
    /*** ionic 7 input component end ***/
    /***********************************/

    return (
        <form onSubmit={handleLogin}>

            <IonInput
                className={`${isValid && 'ion-valid'} ${isValid === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
                type="email"
                fill="solid"
                label="Email"
                labelPlacement="floating"
                helperText="Enter your email"
                errorText="Invalid email"
                onIonInput={(event) => { validate(event); setEmail(`${event.detail.value!}`); }}
                onIonBlur={() => markTouched()}
            ></IonInput>

            <IonInput
                className={`${isValid && 'ion-valid'} ${isValid === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
                type="password"
                fill="solid"
                label="Password"
                labelPlacement="floating"
                helperText="Enter your password"
                onIonInput={(event) => setPassword(`${event.detail.value!}`)}
                onIonBlur={() => markTouched()}
            ></IonInput>

            {/* <IonList className={LoginStyle.form}>
                <IonItem>
                    <IonLabel aria-label="Email">Email: </IonLabel>
                    <IonInput type="email" value={email} placeholder="Enter your email" onIonChange={(e) => setEmail(`${e.detail.value!}`)} required></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel aria-label="Password">Password: </IonLabel>
                    <IonInput type="password" value={password} placeholder="Enter your password" onIonChange={(e) => setPassword(`${e.detail.value!}`)} required></IonInput>
                </IonItem>
            </IonList> */}

            <IonButton type="submit" className={UserStyle.button}>Login</IonButton>
        </form>
    )
}