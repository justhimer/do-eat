import { IonActionSheet, IonBackButton, IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonLoading, IonPage, IonTitle, IonToolbar, useIonToast, useIonViewDidLeave } from "@ionic/react";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { UploadedPhoto, uploadPhoto } from "../../api/fileAPIs";
import { userSignup } from "../../api/userAPIs";
import { UserPhoto, usePhotoGallery } from "../../hooks/usePhotoGallery";
import { gymAction } from "../../redux/gymSlice";
import { userAction } from "../../redux/userSlice";
import NotificationStyle from "../../scss/Notification.module.scss";
import UserStyle from '../../scss/User.module.scss';
import { TakeProfilePic } from "../user/TakeProfilePic";
import { useMutation } from "@tanstack/react-query";

interface SignupDetails {
    email: string;
    username: string;
    password: string;
    icon?: string;
}

export function UserSignupForm() {

    const [present] = useIonToast();
    const history = useHistory();
    const dispatch = useDispatch();

    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [verifyPassword, setVerifyPassword] = useState<string>("");

    useIonViewDidLeave(() => {
        removePhoto();
        setEmail('');
        setUsername('');
        setPassword('');
        setVerifyPassword('');
    })

    const { photo, takePhoto, choosePhoto, removePhoto } = usePhotoGallery();

    async function handleSignup(event: FormEvent<HTMLFormElement>) {
        try {
            event.preventDefault();

            if (password !== verifyPassword) {
                present({
                    message: 'Verify Password Again',
                    duration: 1500,
                    position: "top",
                    cssClass: NotificationStyle.ionicToast,
                });
                return;
            }

            // upload photo
            uploadingPhoto.mutate(photo);

        } catch {
            present({
                message: 'User Sign Up Failed',
                duration: 1500,
                position: "top",
                cssClass: NotificationStyle.ionicToast,
            });
        }
    }

    const uploadingPhoto = useMutation(
        (photo?: UserPhoto): any => {
            let data = undefined;
            if (photo) {
                data = uploadPhoto(photo);
            }
            return data;
        },
        {
            onSuccess: (data: UploadedPhoto) => {
                let iconUrl: string | undefined = undefined;
                if (data) {
                    iconUrl = data.accessPath;
                }
                // create account
                const signupDetails = {
                    email: email,
                    username: username,
                    password: password,
                    icon: iconUrl
                }
                signingUp.mutate(signupDetails);
            }
        }
    )

    const signingUp = useMutation(
        (signupDetails: SignupDetails) => userSignup(signupDetails),
        {
            onSuccess: (data) => {
                if (data) {
                    dispatch(gymAction.logout());
                    dispatch(userAction.login(data));
                    present({
                        message: 'User Signup Success',
                        duration: 1500,
                        position: "top",
                        cssClass: NotificationStyle.ionicToast,
                    });
                    history.push("/user-tab");
                } else {
                    present({
                        message: 'Email registered',
                        duration: 1500,
                        position: "top",
                        cssClass: NotificationStyle.ionicToast,
                    });
                }
            }
        }
    )

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
                            value={email}
                        ></IonInput>

                        <IonInput
                            className={`${isValid && 'ion-valid'} ${isValid === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
                            fill="solid"
                            label="Username"
                            labelPlacement="floating"
                            helperText="Enter your username"
                            onIonInput={(event) => setUsername(`${event.detail.value!}`)}
                            onIonBlur={() => markTouched()}
                            value={username}
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
                            value={password}
                        ></IonInput>

                        <IonInput
                            className={`${isValid && 'ion-valid'} ${isValid === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
                            type="password"
                            fill="solid"
                            label="Verify Password"
                            labelPlacement="floating"
                            helperText="Enter your password again"
                            onIonInput={(event) => setVerifyPassword(`${event.detail.value!}`)}
                            onIonBlur={() => markTouched()}
                            value={verifyPassword}
                        ></IonInput>

                        <IonButton id="open-loading" type="submit" className={UserStyle.button}>Submit</IonButton>
                    </form>

                </div>

                <IonLoading isOpen={uploadingPhoto.isLoading} message="Signing Up..." />

            </IonContent>

        </IonPage >
    )
}