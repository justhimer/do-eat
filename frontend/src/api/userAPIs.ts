export async function facebookLogin(code: string) {

    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/users/login/facebook`, {
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
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/users`, {
        method: "GET",
        headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
    });
    const result = await res.json();
    return result;
}