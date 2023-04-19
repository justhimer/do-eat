import { IonBackButton, IonButton, IonButtons, IonContent, IonDatetime, IonHeader, IonInput, IonItem, IonLabel, IonModal, IonNavLink, IonPage, IonRadio, IonRadioGroup, IonTitle, IonToolbar, useIonToast, useIonViewDidLeave, useIonViewWillEnter } from "@ionic/react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ScheduleCreate, ScheduleInterface, createCourseSchedule, fetchGymSoloCourseSchedule } from "../../../api/coursesSchedulesAPI";
import { ScheduleListItem } from "../ScheduleListItem";
import NotificationStyle from "../../../scss/Notification.module.scss"
import GymCourseStyle from "../../../scss/GymCourses.module.scss"

import '../../../scss/gymCourseDetail.scss'

import { CourseForm } from "../courseForm";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";
import { useRef, useState } from "react";
import { addDays, formatISO } from "date-fns";
import { fetchTrainers } from "../../../api/trainerAPI";
import { zonedTimeToUtc } from "date-fns-tz";



export function CourseDetails() {
    const [present] = useIonToast();
    const selectedCourse = useSelector((state: RootState) => state.gymCourse)
    const [slotTime, setSlotTime] = useState<string>(formatISO(new Date()))
    const [slotTrainer, setSlotTrainer] = useState<number>(selectedCourse.default_trainer_id)
    const [slotQuota, setSlotQuota] = useState<number>(selectedCourse.default_quota)

    const noCourse = (
        <div className={GymCourseStyle.noCourse}>
            <h6 className="title">No Timeslot Available</h6>
            <img src={`./assets/no_course/Yoga.png`} />
            <h5>Let's start by creating a new Timeslot!</h5>
        </div>
    )


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
    })

    useIonViewDidLeave(() => {
        courseSchedules.remove()
    })

    const scheduleCreator = useMutation((createData: ScheduleCreate) => createCourseSchedule(createData),
        {
            onSuccess: (data) => {
                courseSchedules.refetch()
                present({
                    message: 'Timeslot Created',
                    duration: 1500,
                    position: "top",
                    cssClass: NotificationStyle.ionicToast,
                });
                setSlotTime(formatISO(new Date()))
                setSlotTrainer(selectedCourse.default_trainer_id)
                setSlotQuota(selectedCourse.default_quota)
            },
            onError: (error) => {
                present({
                    message: 'Timeslot Creation Failed',
                    duration: 1500,
                    position: "top",
                    cssClass: NotificationStyle.ionicToast,
                });
                throw new Error(String(error))
            }
        })
    const modal = useRef<HTMLIonModalElement>(null);
    const input = useRef<HTMLIonInputElement>(null);

    function confirm() {
        modal.current?.dismiss(input.current?.value, 'confirm');
    }

    function onWillDismiss(e: CustomEvent<OverlayEventDetail>) {
        if (e.detail.role === 'confirm') {
            const reqData:ScheduleCreate = {
                course_id: selectedCourse.course_id,
                quota: Number(slotQuota),
                time: formatISO(zonedTimeToUtc(slotTime,'Asia/Hong_Kong')),
                trainer_id: slotTrainer,
            }
            scheduleCreator.mutate(reqData)
        }
    }

    return (
        <IonPage >
            <IonHeader >
                <IonToolbar >
                    <IonNavLink routerDirection="back" slot="start">
                        <IonBackButton></IonBackButton>
                    </IonNavLink>
                    <IonTitle>Gyms' What</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonModal ref={modal} trigger="open-modal" onWillDismiss={(e) => onWillDismiss(e)}>
                    <IonHeader>
                        <IonToolbar>
                            <IonButtons slot="start">
                                <IonButton onClick={() => modal.current?.dismiss()}>Cancel</IonButton>
                            </IonButtons>
                            <IonTitle>Add Timeslot</IonTitle>
                            <IonButtons slot="end">
                                <IonButton strong={true} onClick={() => confirm()}>
                                    Confirm
                                </IonButton>
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent className={GymCourseStyle.regForm + " ion-padding"}>
                        <IonDatetime id='select-time'
                            min={formatISO(addDays(new Date(), -1))}
                            max={formatISO(addDays(new Date(), 14))}
                            locale="en-HK"
                            onIonChange={(e) => { setSlotTime(e.detail.value as string) }}
                        ></IonDatetime>
                        {trainerList.data && trainerList.data.length > 0 ?
                            <IonRadioGroup value={slotTrainer} name="trainer_choice" onIonChange={(e) => setSlotTrainer(e.detail.value)}>
                                {trainerList.data.map((trainer: any, index: number) => <IonRadio key={index} value={trainer.id} labelPlacement="end">{trainer.name}</IonRadio>)}
                            </IonRadioGroup>
                            : <></>
                        }
                        <IonInput
                            type="number"
                            fill="solid"
                            label="Quota"
                            labelPlacement="floating"
                            onIonInput={(e) => setSlotQuota(e.detail.value as number) }
                            value={slotQuota}
                        ></IonInput>
                    </IonContent>
                </IonModal>

                <CourseForm mode='PUT' />
                <IonButton expand="block" id="open-modal">Add Timeslot </IonButton>
                {courseSchedules.data && courseSchedules.data.length > 0 && courseSchedules.data.map((timeslot: ScheduleInterface, index: number) => <ScheduleListItem key={index} {...timeslot} refetch={()=>courseSchedules.refetch()}/>)}
                {courseSchedules.data && courseSchedules.data.length === 0 && <div className={GymCourseStyle.coursePick}>{noCourse}</div>}
            </IonContent>
        </IonPage >
    )
}