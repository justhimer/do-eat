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
    if (res.ok) {
        const result = await res.json();
        return result;
    }
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
    if (res.ok) {
        const result = await res.json();
        return result;
    }
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
    if (res.ok) {
        const result = await res.json();
        return result;
    }
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
    if (res.ok) {
        const result = await res.json();
        if (result.data) {
            return result.data;
        } else {
            return "./assets/user_image/default_user_icon.png";
        }
    } else {
        return "./assets/user_image/default_user_icon.png";
    }
}

export async function fetchUserInfo() {
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/${controllerName}`, {
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
        return false;
    }
}

export async function fetchIsUserSubscribed() {
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/${controllerName}/is_subscribed`, {
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

export async function fetchUserSubscriptionDetails() {
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/${controllerName}/subscription_details`, {
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

export async function updateUsername(newUsername: string) {
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/${controllerName}/username`, {
        method: "PATCH",
        headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ username: newUsername })
    });
    if (res.ok) {
        const result = await res.json();
        return result;
    } else { return false }
}

export async function validatePassword(inputPassword: string) {
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/${controllerName}/password`, {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ password: inputPassword })
    });
    if (res.ok) {
        const result = await res.json();
        if (!result.isMatch) {
            throw new Error('Incorrect Password');
        }
    } else {
        throw new Error('Server Error');
    }
}

export async function updatePassword(newPassword: string) {
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/${controllerName}/password`, {
        method: "PATCH",
        headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ password: newPassword })
    });
    if (!res.ok) {
        throw new Error('Server Error');
    }
}