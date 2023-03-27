import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { facebookLogin } from "../api/loginAPIs";
import { RootState } from "../redux/store";
import { userAction } from "../redux/userSlice";

export function FacebookCallback() {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState)=> state.users.isAuthenticated);

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search)
        const code = searchParams.get('code') || "";
        (async function () {
            const data = await facebookLogin(code);
            console.log('user = ', data);

            if (data) {
                dispatch(userAction.fbLogin(data));
            } else {
                // Error handling with React - Toastify
            }

        })()
    }, [])

    if (isAuthenticated) {
        return <div>logged in</div>
    } else {
        return <div>not logged in</div>
    }
    
}