import { IonActionSheet, IonBackButton, IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar, useIonToast } from "@ionic/react";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { uploadPhoto } from "../../api/fileAPIs";
import { userSignup } from "../../api/userAPIs";
import { usePhotoGallery } from "../../hooks/usePhotoGallery";
import { gymAction } from "../../redux/gymSlice";
import { userAction } from "../../redux/userSlice";
import NotificationStyle from "../../scss/Notification.module.scss";
import UserStyle from '../../scss/User.module.scss';
import { TakeProfilePic } from "../user/TakeProfilePic";

export function UserSignupForm() {

    const [present] = useIonToast();
    const history = useHistory();
    const dispatch = useDispatch();

    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [image, setImage] = useState<string | undefined>(undefined);

    const { photo, takePhoto, choosePhoto, removePhoto } = usePhotoGallery();

    async function handleSignup(event: FormEvent<HTMLFormElement>) {
        try {
            event.preventDefault();

            let iconUrl: string | undefined = undefined;

            // upload photo
            if (photo) {
                const uploadedPhoto = await uploadPhoto(photo);
                if (uploadedPhoto) {
                    iconUrl = uploadedPhoto.accessPath;
                }
            }

            // create account
            const signupDetails = {
                email: email,
                username: username,
                password: password,
                icon: iconUrl
            }
            const data = await userSignup(signupDetails);

            // auto-login
            if (data) {
                dispatch(gymAction.logout());
                dispatch(userAction.login(data));
                present({
                    message: 'User Login Success',
                    duration: 1500,
                    position: "top",
                    cssClass: NotificationStyle.ionicToast,
                });
                history.push("/user-tab");
            } else {
                present({
                    message: 'User Login Failed',
                    duration: 1500,
                    position: "top",
                    cssClass: NotificationStyle.ionicToast,
                });
            }

        } catch {
            present({
                message: 'User Sign Up Failed',
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

                        {/* profile pic */}
                        <TakeProfilePic photo={photo} />
                        {/* <input type="file" src="" onChange={(e) => setImage(e.target.value)} /> */}
                        <IonActionSheet
                            trigger="change_profile_pic"
                            header="Actions"
                            buttons={[
                                {
                                    text: 'Take Photo',
                                    handler: () => takePhoto(),
                                },
                                {
                                    text: 'Choose from Album',
                                    handler: () => choosePhoto(),
                                },
                                {
                                    text: 'Remove Photo',
                                    handler: () => removePhoto(),
                                },
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    data: {
                                        action: 'cancel'
                                    }
                                }
                            ]}
                        />
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