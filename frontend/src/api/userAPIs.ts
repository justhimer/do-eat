import { FormEvent } from "react";

const controllerName = "users";

interface SignUpDetails {
    email: string,
    username: string,
    password: string,
    icon?: string
}

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

export async function userSignup(signupDetails: SignUpDetails) {
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/${controllerName}/signup`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(signupDetails)
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

export async function fetchProfilePic() {
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/${controllerName}/profile_pic`, {
        method: "GET",
        headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
    });
}

export async function getUserInfo() {
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/${controllerName}`, {
        method: "GET",
        headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
    });
    if (res.ok) {
        console.log(res)
        const result = await res.json();
        return result;
    } else {
        throw new Error
    }
}

export async function getUserSubscribed(id: number) {
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/${controllerName}/is_subscribed/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
    });
    if (res.ok) {
        const result = await res.json();
        return result;
    } else {
        throw new Error
    }
}