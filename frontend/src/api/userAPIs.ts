import { FormEvent } from "react";

const controllerName = "users";

export async function userLogin(email: string, password: string) {
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/${controllerName}/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    const result = await res.json();
    if (res.ok) { return result }
    else { return false }
}

export async function facebookLogin(code: string) {
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/${controllerName}/login/facebook`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({ code })
    })
    const result = await res.json();
    if (res.ok) { return result }
    else { return false }
}

export async function getUserInfo() {
    console.log("getting user info at userAPI")
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/${controllerName}`, {
        method: "GET",
        headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
    });
    if (res.ok){
        const result = await res.json();
        return result;
    }else{
        throw new Error
    }
}

export async function getUserSubscribed() {
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/${controllerName}/is_subscribed/`, {
        method: "GET",
        headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
    });
    if (res.ok){
        const result = await res.json();
        return result;
    }else{
        throw new Error
    }
}

export async function uploadImage(event: FormEvent<HTMLFormElement>) {

    const form = event.target;
    if (form){
        const formData = new FormData(form as HTMLFormElement);

        const res = await fetch(`${process.env.REACT_APP_API_SERVER}/${controllerName}/file`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({ formData })
        })
    }  
}