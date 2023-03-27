import { IonButton } from "@ionic/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { userAction } from "../redux/userSlice";
import Notice from "../scss/Notice.module.scss"

// react-toastify
import { ToastContainer, toast } from 'react-toastify';
import { Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Logout() {

    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.users.isAuthenticated);

    function logout() {
        if (isAuthenticated) {
            dispatch(userAction.logout());
            toast.success("Log-out success.");
        }
    }

    return (
        <div>
            <IonButton onClick={logout}>Logout</IonButton>
        </div>
    )
}