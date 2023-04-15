import { IonActionSheet, IonBackButton, IonButton, IonCard, IonCardTitle, IonChip, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonNavLink, IonPage, IonRadio, IonRadioGroup, IonRow, IonTitle, IonToolbar, useIonToast, useIonViewDidLeave, useIonViewWillEnter } from "@ionic/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import ConfirmationStyle from '../../../scss/GymConfirm.module.scss'
import { cardOutline, flameOutline } from "ionicons/icons";
import { format } from "date-fns";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ScheduleInterface, fetchGymSoloCourseSchedule } from "../../../api/coursesSchedulesAPI";
import { ScheduleListItem } from "../ScheduleListItem";
import { useHistory } from "react-router";
import { FormEvent, useState } from "react";
import { UserPhoto, usePhotoGallery } from "../../../hooks/usePhotoGallery";
import NotificationStyle from "../../../scss/Notification.module.scss";
import { UploadedPhoto, uploadPhoto } from "../../../api/fileAPIs";
import { userSignup } from "../../../api/userAPIs";
import { gymAction } from "../../../redux/gymSlice";
import { userAction } from "../../../redux/userSlice";
import { TakeProfilePic } from "../../user/TakeProfilePic";
import UserStyle from '../../../scss/User.module.scss';
import { fetchTrainers } from "../../../api/trainerAPI";



export function CourseDetails() {

    const selectedCourse = useSelector((state: RootState) => state.gymCourse)
    const courseSchedules = useQuery({
        queryKey: ['scheduleQuery'],
        queryFn: () => fetchGymSoloCourseSchedule(selectedCourse.course_id)
    })
    const trainerList = useQuery({
        queryKey: ['trainerQuery'],
        queryFn: () => fetchTrainers()
    })

    useIonViewWillEnter(() => {
        courseSchedules.refetch()
        trainerList.refetch()
    })

    useIonViewDidLeave(() => {
        courseSchedules.remove()
        trainerList.remove()
    })

    //justin's work

    const [present] = useIonToast();
    const history = useHistory();
    const dispatch = useDispatch();

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [verifyPassword, setVerifyPassword] = useState<string>("");

    useIonViewDidLeave(() => {
        removePhoto();
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
                    username: username,
                    password: password,
                    icon: iconUrl
                }
                signingUp.mutate(signupDetails);
            }
        }
    )

    const signingUp = useMutation(
        (signupDetails: any) => userSignup(signupDetails),
        {
            onSuccess: (data) => {
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
            }
        }
    )

    /*************************************/
    /*** ionic 7 input component start ***/
    /*************************************/

    const [isTouched, setIsTouched] = useState(false);
    const [isValid, setIsValid] = useState<boolean>();


    const validate = (ev: Event) => {
        const value = (ev.target as HTMLInputElement).value;

        setIsValid(undefined);

        if (value === '') return;

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
                    <IonNavLink routerDirection="back" slot="start">
                        <IonBackButton></IonBackButton>
                    </IonNavLink>
                    <IonTitle>Gyms' "What"</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
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
                        {trainerList.data ? <IonRadioGroup onSelect={(e)=>{console.log(e.detail.value)}} value={String(selectedCourse.default_trainer_id)} >
                            {trainerList.data.map((trainer: any, index: number) => <IonRadio key={index} value={String(trainer.id)}>{trainer.id} {trainer.name}</IonRadio>)}
                        </IonRadioGroup> : <></>}

                        <IonInput
                            className={`${isValid && 'ion-valid'} ${isValid === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
                            type="text"
                            fill="solid"
                            label="Name"
                            labelPlacement="floating"
                            onIonInput={(event) => setVerifyPassword(`${event.detail.value!}`)}
                            onIonBlur={() => markTouched()}
                            value={verifyPassword}
                        ></IonInput>

                        <IonInput
                            className={`${isValid && 'ion-valid'} ${isValid === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
                            type="number"
                            fill="solid"
                            label="Calories"
                            labelPlacement="floating"
                            onIonInput={(event) => setPassword(`${event.detail.value!}`)}
                            onIonBlur={() => markTouched()}
                            value={password}
                        ></IonInput>

                        <IonInput
                            className={`${isValid && 'ion-valid'} ${isValid === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
                            type="number"
                            fill="solid"
                            label="Credits"
                            labelPlacement="floating"
                            onIonInput={(event) => setVerifyPassword(`${event.detail.value!}`)}
                            onIonBlur={() => markTouched()}
                            value={verifyPassword}
                        ></IonInput>

                        <IonInput
                            className={`${isValid && 'ion-valid'} ${isValid === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
                            fill="solid"
                            label="Course type"
                            labelPlacement="floating"
                            onIonInput={(event) => setUsername(`${event.detail.value!}`)}
                            onIonBlur={() => markTouched()}
                            value={username}
                        ></IonInput>

                        <IonInput
                            className={`${isValid && 'ion-valid'} ${isValid === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
                            type="number"
                            fill="solid"
                            label="Default quota"
                            labelPlacement="floating"
                            onIonInput={(event) => setVerifyPassword(`${event.detail.value!}`)}
                            onIonBlur={() => markTouched()}
                            value={verifyPassword}
                        ></IonInput>

                        <IonInput
                            className={`${isValid && 'ion-valid'} ${isValid === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
                            type="number"
                            fill="solid"
                            label="Duration (Min)"
                            labelPlacement="floating"
                            onIonInput={(event) => setVerifyPassword(`${event.detail.value!}`)}
                            onIonBlur={() => markTouched()}
                            value={verifyPassword}
                        ></IonInput>

                        <IonButton id="open-loading" type="submit" className={UserStyle.button}>Submit</IonButton>
                    </form>

                </div>
                <IonButton expand="block">Add Timeslot </IonButton>
                {courseSchedules.data && courseSchedules.data.length > 0 ? courseSchedules.data.map((timeslot: ScheduleInterface, index: number) => <ScheduleListItem key={index} {...timeslot} />) : <h5>No schedule set for course</h5>}
            </IonContent>
        </IonPage >
    )
}