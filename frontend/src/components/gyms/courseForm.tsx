import { IonButton, IonInput, IonRadio, IonRadioGroup, useIonToast } from "@ionic/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCourseDetail, gymCourseData, gymCourseUpload, updateCourseDetail } from "../../api/coursesApi";
import { useMutation, useQuery } from "@tanstack/react-query";
import { sendGymCourse } from "../../redux/gymCourseSlice";
import NotificationStyle from "../../scss/Notification.module.scss"
import UserStyle from "../../scss/User.module.scss"
import { RootState } from "../../redux/store";
import { getCourseType } from "../../api/courseTypeAPI";
import { getIntensityLevel } from "../../api/intensityAPI";
import { fetchTrainers } from "../../api/trainerAPI";



export function CourseForm(props: {mode:'PUT' | 'POST'} ) {

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

    const [courseName, setCourseName] = useState<string>(selectedCourse.name);
    const [courseCalories, setCourseCalories] = useState<number>(selectedCourse.calories);
    const [courseCredits, setCourseCredits] = useState<number>(selectedCourse.credits);
    const [courseQuota, setCourseQuota] = useState<number>(selectedCourse.default_quota);
    const [courseDuration, setCourseDuration] = useState<number>(selectedCourse.duration)

    async function handleSignup(event: any) {
        event.preventDefault();
        const prepData: gymCourseUpload = {
            id: selectedCourse.course_id,
            intensity_id: Number(event.target.intensity_choice.value),
            course_type_id: Number(event.target.course_type_choice.value),
            gym_id: selectedCourse.gym_id,
            name: courseName,
            credits: Number(courseCredits),
            calories: Number(courseCalories),
            duration: Number(courseDuration),
            default_quota: courseQuota,
            default_trainer_id: Number(event.target.trainer_choice.value),
        }
        if(mode == 'PUT'){
            updateDetails.mutate(prepData)
        }else if (mode=='POST'){
            createDetails.mutate(prepData)
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
        (createData : gymCourseUpload)=>createCourseDetail(createData),
        {
            onSuccess: (data)=>{
                present({
                    message: 'Course Created',
                    duration: 1500,
                    position: "top",
                    cssClass: NotificationStyle.ionicToast,
                });
            },
            onError:(error)=>{
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
        <div className={UserStyle.form}>

            <div className={UserStyle.title}>
                <h2>Sign Up</h2>
            </div>

            <form onSubmit={handleSignup}>

                <div className={UserStyle.image_container}>
                    <img
                        src={defaultPhotoPath} //change to image src later
                        className={UserStyle.image_box}
                        id="change_profile_pic" />
                </div>

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
                    onIonInput={(event) => setCourseName(event.target.value as string)}

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

                <IonButton id="open-loading" type="submit" className={UserStyle.button}>Submit</IonButton>
            </form>

        </div>
    </>
}