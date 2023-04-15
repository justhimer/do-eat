const controllerName = "gyms";

export async function gymLogin(username: string, password: string) {
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/${controllerName}/login`, {
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

export async function fetchGymInfo() {
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/${controllerName}`, {
        method: "GET",
        headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${localStorage.getItem('gym_token')}`
        },
    });
    if (res.ok) {
        const result = await res.json();
        return result;
    } else {
        return false;
    }
}

export async function gymAll() {
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/${controllerName}/users/district/all`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        }
    })
    const result = await res.json();
    return result
}

export async function gymSome(districts:number[]) {
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/${controllerName}/users/district/some`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(districts)
    })
    const result = await res.json();
    return result
}

