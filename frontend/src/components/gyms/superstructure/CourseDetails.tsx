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
import { FormEvent, useEffect, useState } from "react";
import { UserPhoto, usePhotoGallery } from "../../../hooks/usePhotoGallery";
import NotificationStyle from "../../../scss/Notification.module.scss";
import { UploadedPhoto, uploadPhoto } from "../../../api/fileAPIs";
import { userSignup } from "../../../api/userAPIs";
import { gymAction } from "../../../redux/gymSlice";
import { userAction } from "../../../redux/userSlice";
import { TakeProfilePic } from "../../user/TakeProfilePic";
import UserStyle from '../../../scss/User.module.scss';
import { fetchTrainers } from "../../../api/trainerAPI";
import { resetGymCourse, sendGymCourse } from "../../../redux/gymCourseSlice";
import '../../../scss/gymCourseDetail.scss'
import { getCourseType } from "../../../api/courseTypeAPI";
import { gymCourseData, gymCourseUpload, updateCourseDetail } from "../../../api/coursesApi";
import { getIntensityLevel } from "../../../api/intensityAPI";



export function CourseDetails() {

    const [test, setTest] = useState(NaN)
    const [trainerValue, setTrainerValue] = useState(0)
    const selectedCourse = useSelector((state: RootState) => state.gymCourse)
    const courseSchedules = useQuery({
        queryKey: ['scheduleQuery'],
        queryFn: () => fetchGymSoloCourseSchedule(selectedCourse.course_id)
    })
    const trainerList = useQuery({
        queryKey: ['trainerQuery'],
        queryFn: () => fetchTrainers()
    })
    const courseTypeList = useQuery({
        queryKey: ['courseTypeQuery'],
        queryFn: () => getCourseType()
    })
    const intensityLevelList = useQuery({
        queryKey: ['intensityQuery'],
        queryFn: () => getIntensityLevel()
    })

    useIonViewWillEnter(() => {
        courseSchedules.refetch()
        trainerList.refetch()
    })

    useIonViewDidLeave(() => {
        courseSchedules.remove()
        trainerList.remove()
        setTrainerValue(0)
        dispatch(resetGymCourse())
    })
    useEffect(() => {
        setTrainerValue(selectedCourse.default_trainer_id)
    }, [courseSchedules.data])


    //#region justin's work 

    const [present] = useIonToast();
    const history = useHistory();
    const dispatch = useDispatch();

    const [courseName, setCourseName] = useState<string>(selectedCourse.name);
    const [courseCalories, setCourseCalories] = useState<number>(selectedCourse.calories);
    const [courseCredits, setCourseCredits] = useState<number>(selectedCourse.credits);
    const [courseQuota, setCourseQuota] = useState<number>(selectedCourse.default_quota);
    const [courseDuration, setCourseDuration] = useState<number>(selectedCourse.duration)

    const { photo, takePhoto, choosePhoto, removePhoto } = usePhotoGallery();

    async function handleSignup(event: any) {
        try {
            event.preventDefault();
            const prepData: gymCourseUpload = {
                id: selectedCourse.course_id,
                intensity_id: Number(event.target.intensity_choice.value),
                course_type_id: Number(event.target.course_type_choice.value),
                gym_id: selectedCourse.gym_id,
                name: courseName,
                credits: courseCredits,
                calories: courseCalories,
                duration: courseDuration,
                default_quota: courseQuota,
                default_trainer_id: Number(event.target.trainer_choice.value),
            }
            console.log(prepData)
            updateDetails.mutate(prepData)
        } catch {
            present({
                message: 'Course Update Failed',
                duration: 1500,
                position: "top",
                cssClass: NotificationStyle.ionicToast,
            });
        }
    }

    const updateDetails = useMutation(
        (updateData: gymCourseUpload) => updateCourseDetail(updateData),
        {
            onSuccess: (data) => {
                dispatch(sendGymCourse(data as gymCourseData))
                console.log('success')
            },
            onError:(error)=>{
                throw new Error(String(error))
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

    //#endregion
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
                        {trainerList.data && trainerList.data.length > 0 ?
                            <IonRadioGroup value={selectedCourse.default_trainer_id} name="trainer_choice">
                                {trainerList.data.map((trainer: any, index: number) => <IonRadio key={index} value={trainer.id} labelPlacement="end">{trainer.name}</IonRadio>)}
                            </IonRadioGroup>
                            : <></>
                        }

                        <IonInput
                            className={`${isValid && 'ion-valid'} ${isValid === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
                            type="text"
                            fill="solid"
                            label="Name"
                            labelPlacement="floating"
                            onIonInput={(event) => setCourseName(String(event.detail.value))}
                            onIonBlur={() => markTouched()}
                            value={courseName}
                        ></IonInput>

                        {intensityLevelList.data && intensityLevelList.data.length > 0 ?
                            <IonRadioGroup value={selectedCourse.intensity_id} name="intensity_choice">
                                {intensityLevelList.data.map((intensity: any, index: number) => <IonRadio key={index} value={intensity.id} labelPlacement="end">{intensity.level}</IonRadio>)}
                            </IonRadioGroup>
                            : <></>
                        }

                        <IonInput
                            className={`${isValid && 'ion-valid'} ${isValid === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
                            type="number"
                            fill="solid"
                            label="Calories"
                            labelPlacement="floating"
                            onIonInput={(event) => setCourseCalories(Number(event.detail.value))}
                            onIonBlur={() => markTouched()}
                            value={courseCalories}
                        ></IonInput>

                        <IonInput
                            className={`${isValid && 'ion-valid'} ${isValid === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
                            type="number"
                            fill="solid"
                            label="Credits"
                            labelPlacement="floating"
                            onIonInput={(event) => setCourseCredits(Number(event.detail.value))}
                            onIonBlur={() => markTouched()}
                            value={courseCredits}
                        ></IonInput>

                        {courseTypeList.data && courseTypeList.data.length > 0 ?
                            <IonRadioGroup value={selectedCourse.course_type_id} name="course_type_choice">
                                {courseTypeList.data.map((type: any, index: number) => <IonRadio key={index} value={type.id} labelPlacement="end">{type.name}</IonRadio>)}
                            </IonRadioGroup>
                            : <></>
                        }

                        <IonInput
                            className={`${isValid && 'ion-valid'} ${isValid === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
                            type="number"
                            fill="solid"
                            label="Default quota"
                            labelPlacement="floating"
                            onIonInput={(event) => setCourseQuota(Number(event.detail.value))}
                            onIonBlur={() => markTouched()}
                            value={courseQuota}
                        ></IonInput>

                        <IonInput
                            className={`${isValid && 'ion-valid'} ${isValid === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
                            type="number"
                            fill="solid"
                            label="Duration (Min)"
                            labelPlacement="floating"
                            onIonInput={(event) => setCourseDuration(Number(event.detail.value))}
                            onIonBlur={() => markTouched()}
                            value={courseDuration}
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