import { IonBackButton, IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar, useIonToast } from "@ionic/react";
import { FormEvent, useState } from "react";
import { uploadFile } from "../../api/fileAPIs";
import { userSignup } from "../../api/userAPIs";
import NotificationStyle from "../../scss/Notification.module.scss";
import UserStyle from '../../scss/User.module.scss';
import { TakeProfilePic } from "../user/TakeProfilePic";

export function Signup() {

    const [present] = useIonToast();
    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    async function handleSignup(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const values = {
            icon: "",
            email: email,
            username: username,
            password: password
        }
        await uploadFile(values.icon);
        await userSignup();
        present({
            message: 'User Sign-up Success',
            duration: 1500,
            position: "top",
            cssClass: NotificationStyle.ionicToast,
        });
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
        <IonPage >

            <IonHeader >
                <IonToolbar >
                    <IonButton slot="start">
                        <IonBackButton default-href="/"></IonBackButton>
                    </IonButton>
                    <IonTitle>User Registration</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>

                {/* <Logo /> */}
                {/* <CornerBox /> */}

                <div className={UserStyle.form}>

                    <div className={UserStyle.title}>
                        <h2>Sign Up</h2>
                    </div>

                    <form onSubmit={handleSignup}>

                        <TakeProfilePic />
                        <div className={UserStyle.text_center}>Profile Picture</div>

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

                        <IonInput
                            className={`${isValid && 'ion-valid'} ${isValid === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
                            type="password"
                            fill="solid"
                            label="Verify Password"
                            labelPlacement="floating"
                            helperText="Enter your password again"
                            onIonInput={(event) => setPassword(`${event.detail.value!}`)}
                            onIonBlur={() => markTouched()}
                        ></IonInput>

                        {/* <br />
                        <div className={UserStyle.text_center}>Profile Picture</div>
                        <div className={UserStyle.image_container}>
                            <img id="profile_pic" src={imgSrc} alt="" className={UserStyle.image_box} />
                        </div>
                        <input type="file" onChange={previewImg} /> */}

                        <IonButton type="submit" className={UserStyle.button}>Submit</IonButton>
                    </form>

                </div>

            </IonContent>

        </IonPage >
    )
}

function useForm(): { register: any; handleSubmit: any; } {
    throw new Error("Function not implemented.");
}
