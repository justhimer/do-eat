// Ionic Component
import { IonButton, IonInput, IonRadio, IonRadioGroup, useIonToast, useIonViewDidLeave } from "@ionic/react";

// State Management
import { useMutation, useQuery } from "@tanstack/react-query";
import { resetGymCourse, sendGymCourse } from "../../redux/gymCourseSlice";
import { RootState } from "../../redux/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";


// API
import { getCourseType } from "../../api/courseTypeAPI";
import { getIntensityLevel } from "../../api/intensityAPI";
import { fetchTrainers } from "../../api/trainerAPI";
import { createCourseDetail, gymCourseData, gymCourseUpload, updateCourseDetail } from "../../api/coursesApi";



// Routing
import { useHistory } from "react-router";

// CSS
import NotificationStyle from "../../scss/Notification.module.scss"
import UserStyle from "../../scss/User.module.scss"
import GymCourseStyle from "../../scss/GymCourses.module.scss"



export function CourseForm(props: { mode: 'PUT' | 'POST' }) {

    const history = useHistory()
    const mode = props.mode
    const selectedCourse = useSelector((state: RootState) => state.gymCourse);
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



    const defaultPhotoPath = "./assets/user_image/default_user_icon.png";
    const [present] = useIonToast();
    const dispatch = useDispatch();

    useIonViewDidLeave(() => {
        dispatch(resetGymCourse())
        setCourseName(selectedCourse.name);
        setCourseCalories(selectedCourse.calories);
        setCourseCredits(selectedCourse.credits);
        setCourseQuota(selectedCourse.default_quota);
        setCourseDuration(selectedCourse.duration)
        setCourseTrainer(selectedCourse.default_trainer_id)
        setCourseIntensity(selectedCourse.intensity_id);
        setCourseType(selectedCourse.course_type_id)
        setTrainerPic(selectedCourse.trainer_icon)
    })

    const [courseName, setCourseName] = useState<string>(selectedCourse.name);
    const [courseCalories, setCourseCalories] = useState<number>(selectedCourse.calories);
    const [courseCredits, setCourseCredits] = useState<number>(selectedCourse.credits);
    const [courseQuota, setCourseQuota] = useState<number>(selectedCourse.default_quota);
    const [courseDuration, setCourseDuration] = useState<number>(selectedCourse.duration);
    const [courseTrainer, setCourseTrainer] = useState<number>(selectedCourse.default_trainer_id)
    const [courseIntensity, setCourseIntensity] = useState<number>(selectedCourse.intensity_id);
    const [courseType, setCourseType] = useState<number>(selectedCourse.course_type_id)
    const [trainerPic, setTrainerPic] = useState<string>(selectedCourse.trainer_icon)

    async function handleSignup(event: any) {
        event.preventDefault();
        const prepData: gymCourseUpload = {
            id: selectedCourse.course_id,
            intensity_id: Number(courseIntensity),
            course_type_id: Number(courseType),
            gym_id: selectedCourse.gym_id,
            name: courseName,
            credits: Number(courseCredits),
            calories: Number(courseCalories),
            duration: Number(courseDuration),
            default_quota: Number(courseQuota),
            default_trainer_id: Number(courseTrainer),
        }
        if (mode == 'PUT') {
            updateDetails.mutate(prepData)
        } else if (mode == 'POST') {
            createDetails.mutate(prepData)
            history.push('/gyms-do')
        }
    }

    const updateDetails = useMutation(
        (updateData: gymCourseUpload) => updateCourseDetail(updateData),
        {
            onSuccess: (data) => {
                dispatch(sendGymCourse(data as gymCourseData))
                present({
                    message: 'Course Update Successful',
                    duration: 1500,
                    position: "top",
                    cssClass: NotificationStyle.ionicToast,
                });
                history.push('/gyms-do')
            },
            onError: (error) => {
                present({
                    message: 'Course Update Failed',
                    duration: 1500,
                    position: "top",
                    cssClass: NotificationStyle.ionicToast,
                });
                throw new Error(String(error))

            }
        }
    )

    const createDetails = useMutation(
        (createData: gymCourseUpload) => createCourseDetail(createData),
        {
            onSuccess: (data) => {

                present({
                    message: 'Course Created',
                    duration: 1500,
                    position: "top",
                    cssClass: NotificationStyle.ionicToast,
                });
            },
            onError: (error) => {
                present({
                    message: 'Course Creation Failed',
                    duration: 1500,
                    position: "top",
                    cssClass: NotificationStyle.ionicToast,
                });
                throw new Error(String(error))
            }
        }

    )

    /*************************************/
    /*** ionic 7 input component start ***/
    /*************************************/

    const [isTouched, setIsTouched] = useState(false);
    const [isValid, setIsValid] = useState<boolean>();

    /***********************************/
    /*** ionic 7 input component end ***/
    /***********************************/


    return <>
        <div className={GymCourseStyle.regForm + ' ion-padding'}>

            <div className={UserStyle.title}>
                <h2>Course Details</h2>
            </div>

            <form onSubmit={handleSignup}>

            <div className={UserStyle.image_container}>
                <img
                    src={trainerPic} //change to image src later
                    className={UserStyle.image_box}
                    id="change_profile_pic" />
            </div>:

                

                <h5>Trainer</h5>

                {trainerList.data && trainerList.data.length > 0 ?
                    <IonRadioGroup value={courseTrainer} name="trainer_choice" onIonChange={(e) => { 
                        setTrainerPic((trainerList.data.find((i:any)=>i.id == e.detail.value)).icon)
                        setCourseTrainer(e.detail.value) }}>
                        {trainerList.data.map((trainer: any, index: number) => <IonRadio key={index} value={trainer.id} labelPlacement="end">{trainer.name}</IonRadio>)}
                    </IonRadioGroup>
                    : <></>
                }
                <h5>Course Details</h5>
                <IonInput
                    className={`${isValid && 'ion-valid'} ${isValid === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
                    type="text"
                    fill="solid"
                    label="Name"
                    labelPlacement="floating"
                    onIonInput={(event) => setCourseName(event.target.value as string)}

                    value={courseName}
                ></IonInput>

                <IonInput
                    className={`${isValid && 'ion-valid'} ${isValid === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
                    type="number"
                    fill="solid"
                    label="Calories"
                    labelPlacement="floating"
                    onIonInput={(event) => setCourseCalories(event.detail.value as number)}

                    value={courseCalories}
                ></IonInput>

                <IonInput
                    className={`${isValid && 'ion-valid'} ${isValid === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
                    type="number"
                    fill="solid"
                    label="Credits"
                    labelPlacement="floating"
                    onIonInput={(event) => setCourseCredits(event.detail.value as number)}

                    value={courseCredits}
                ></IonInput>


                <IonInput
                    className={`${isValid && 'ion-valid'} ${isValid === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
                    type="number"
                    fill="solid"
                    label="Default quota"
                    labelPlacement="floating"
                    onIonInput={(event) => setCourseQuota(event.detail.value as number)}

                    value={courseQuota}
                ></IonInput>

                <IonInput
                    className={`${isValid && 'ion-valid'} ${isValid === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
                    type="number"
                    fill="solid"
                    label="Duration (Min)"
                    labelPlacement="floating"
                    onIonInput={(event) => setCourseDuration(event.detail.value as number)}

                    value={courseDuration}
                ></IonInput>

                <h5>Intensity</h5>
                {intensityLevelList.data && intensityLevelList.data.length > 0 ?
                    <IonRadioGroup value={courseIntensity} name="intensity_choice" onIonChange={(e) => { setCourseIntensity(e.detail.value) }}>
                        {intensityLevelList.data.map((intensity: any, index: number) => <IonRadio key={index} value={intensity.id} labelPlacement="end">{intensity.level}</IonRadio>)}
                    </IonRadioGroup>
                    : <></>
                }

                <h5>Course Type</h5>
                {courseTypeList.data && courseTypeList.data.length > 0 ?
                    <IonRadioGroup value={courseType} name="course_type_choice" onIonChange={(e) => { setCourseType(e.detail.value) }}>
                        {courseTypeList.data.map((type: any, index: number) => <IonRadio key={index} value={type.id} labelPlacement="end">{type.name}</IonRadio>)}
                    </IonRadioGroup>
                    : <></>
                }

                <IonButton id="open-loading" type="submit" className={UserStyle.button}>{mode == 'POST' ? 'Submit' : 'Update'}</IonButton>
            </form>

        </div>
    </>
}