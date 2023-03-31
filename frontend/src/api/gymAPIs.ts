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