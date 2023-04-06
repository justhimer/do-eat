import { IonBackButton, IonButton, IonCol, IonContent, IonHeader, IonItem, IonLabel, IonList, IonNavLink, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import UserMenuStyle from "../../scss/UserMenu.module.scss";
import { useHistory } from "react-router";
import { CoursesDatePick } from "../CoursesDatePick";
import { CoursesPick } from "../CoursesPick";
import { useState } from "react";
import { CoursesInterface } from "../../../redux/userCourseSlice";


export function GymCourses() {


    return (
        <IonPage >
            <IonHeader >
                <IonToolbar >
                <IonNavLink routerDirection="back" slot="start">
                        <IonBackButton></IonBackButton>
                    </IonNavLink>
                    <IonTitle>Do "When"</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
            <CoursesDatePick />
            <CoursesPick />
            </IonContent>
        </IonPage >
    )
}