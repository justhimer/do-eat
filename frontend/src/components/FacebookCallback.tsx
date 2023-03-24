import { useEffect } from "react";
import { facebookLogin } from "../api/loginAPIs";

export function FacebookCallback(){
    // const dispatch = useAppDispatch()
    // const isAuthenticated = useAppSelector(state=> state.auth.isAuthenticated)
    useEffect(()=>{
        const searchParams = new URLSearchParams(window.location.search)
        const code = searchParams.get('code') || "";
        (async function(){
            const data = await facebookLogin(code);
            console.log('user = ', data);
            
            // if(data){
            //     dispatch(login(data.username))
            // }else{
            //     Error handling with React-Toastify
            // }

        })()
    },[])

    return (
        <div>facebook called back</div>
    )

    // if(isAuthenticated){
    //     return <Navigate to="/" replace/>
    // }
    // return <h3>Redirecting to main page...</h3>
}