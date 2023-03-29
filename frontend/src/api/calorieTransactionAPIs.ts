const controllerName = "calorie";

export async function fetchCalories() {
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