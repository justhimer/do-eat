import UserMenuStyle from "../../scss/UserMenu.module.scss";
import courseStyle from '../../scss/GymCourses.module.scss'

import { useParams } from "react-router";
import { gymFindAllAttendance } from "../../api/userScheduleAPI";
import { useQuery } from "@tanstack/react-query";
import { GymShowAttendanceItem } from "./GymShowAttendanceItem";
import { IonPage, IonHeader, IonToolbar, IonButton, IonBackButton, IonTitle, IonContent, IonRefresher, IonRefresherContent, IonCard, IonCardContent, IonList, IonItem, IonLabel, RefresherEventDetail, IonCardHeader, IonCardSubtitle, IonChip, IonCardTitle, useIonViewWillEnter } from "@ionic/react";
import { fetchCourseName } from "../../api/coursesSchedulesAPI";


export function GymShowAttendance() {

    const param = useParams<{ course_schedule_id: string }>();

    const { data: courseName, refetch: refetchCourseName } = useQuery({
        queryKey: ["course_name"],
        queryFn: async () => {
            const courseName = await fetchCourseName(parseInt(param.course_schedule_id));
            // console.log('courseName: ', courseName);
            return courseName;
        },
    });

    const { data: attendedUsers, refetch: refetchAttendedUsers } = useQuery({
        queryKey: ["attended_users"],
        queryFn: async () => {
            const attendedUsers = await gymFindAllAttendance(parseInt(param.course_schedule_id));
            // console.log('attendedUsers: ', attendedUsers);
            return attendedUsers;
        },
    });

    function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
        refetchCourseName().then(() => {
            refetchAttendedUsers().then(() => {
                event.detail.complete();
            })
        })
    }

    useIonViewWillEnter(() => {
        refetchAttendedUsers();
    })

    return (
        <IonPage >
            <IonHeader >
                <IonToolbar >
                    <IonButton slot="start">
                        <IonBackButton default-href="/"></IonBackButton>
                    </IonButton>
                    <IonTitle>Attendance List</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>

                <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>

                <IonCard>
                    <IonCardHeader>
                        <div className={courseStyle.cardTopRightChips}>
                            <IonChip >
                                <IonLabel>Total Attended: {attendedUsers ? attendedUsers.length : 0}</IonLabel>
                            </IonChip>
                        </div>
                        {courseName && <IonCardTitle>{courseName.courses.name}</IonCardTitle>}
                        <IonCardSubtitle>Class #{param.course_schedule_id}</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonList>
                            <IonItem className={UserMenuStyle.item}>
                                <IonLabel className={UserMenuStyle.label}>
                                    <h2 className={UserMenuStyle.width_50}>Username</h2>
                                    <p className={UserMenuStyle.width_50}>Status</p>
                                </IonLabel>
                            </IonItem>
                            {
                                attendedUsers && attendedUsers.length > 0 && attendedUsers.map((attendedUser: any, index: number) => (
                                    <GymShowAttendanceItem
                                        key={index}
                                        user_name={attendedUser.user.username}
                                        attendance_status={attendedUser.attendance_type.details}
                                    />
                                ))
                            }
                        </IonList>
                    </IonCardContent>

                </IonCard>

            </IonContent>
        </IonPage >
    )
}