import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { facebookLogin } from "../../api/userAPIs";
import { RootState } from "../../redux/store";
import { userAction } from "../../redux/userSlice";
import { useHistory } from 'react-router';
import { RedirectPage } from "../RedirectPage";

export function FacebookCallback() {
    const history = useHistory();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state: RootState) => state.user.isAuthenticated);

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search)
        const code = searchParams.get('code') || "";
        (async function () {
            const data = await facebookLogin(code);
            if (data) {
                dispatch(userAction.login(data));
            } else {
                // Error handling with React - Toastify
            }
        })()
    }, []);

    useEffect(() => {
        if (isLoggedIn) {
            history.push("/user-tab")
        }
    }, [isLoggedIn])

    return <RedirectPage />

}