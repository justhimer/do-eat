const controllerName = "users";

export async function emailLogin(email: string, password: string) {
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/${controllerName}/login/email`, {
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

export async function usernameLogin(username: string, password: string) {
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/${controllerName}/login/username`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
            username: username,
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
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/${controllerName}`, {
        method: "GET",
        headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
    });
    const result = await res.json();
    return result;
}