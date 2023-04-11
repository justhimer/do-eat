const controllerName = "payment"

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