import { IonButton, IonInput, IonItem, IonLabel, IonList, useIonToast } from "@ionic/react";
import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { gymLogin } from "../../api/gymAPIs";
import { RootState } from "../../redux/store";
import UserStyle from '../../scss/User.module.scss';
import NotificationStyle from "../../scss/Notification.module.scss";
import { userAction } from "../../redux/userSlice";
import { gymAction } from "../../redux/gymSlice";

export function GymLoginForm() {

    const [present] = useIonToast();

    const history = useHistory();
    const dispatch = useDispatch();

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    async function handleLogin(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const data = await gymLogin(username, password);
        if (data) {
            dispatch(userAction.logout());
            dispatch(gymAction.login(data));
            present({
                message: 'Gym Login Success',
                duration: 1500,
                position: "top",
                cssClass: NotificationStyle.ionicToast,
            });
        } else {
            present({
                message: 'Gym Login Failed',
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
                fill="solid"
                label="Username"
                labelPlacement="floating"
                helperText="Enter your username"
                onIonInput={(event) => setUsername(`${event.detail.value!}`)}
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
                    <IonLabel aria-label="Username">Username: </IonLabel>
                    <IonInput placeholder="Enter your username" onIonChange={(e) => setUsername(`${e.detail.value!}`)} required></IonInput>
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